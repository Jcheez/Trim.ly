import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  registerUserReqBodyInterface,
  registerUserResBodyInterface,
  loginUserResBodyInterface,
  loginUserReqBodyInterface,
  decodedRefreshTokenInteraface,
  retrieveUserProfileResBodyInterface,
  retrieveUserProfileReqBodyInterface,
  updateUsernameResBodyInterface,
  updateUsernameReqBodyInterface,
  updatePasswordResBodyInterface,
  updatePasswordReqBodyInterface,
  deleteUserAccountResBodyInterface,
  deleteUserAccountReqBodyInterface
} from '../interfaces/user.interface';
import User from '../models/user.model';
import {
  ACCESS_TOKEN_PRIVATEKEY,
  ENCRYPTION_PUBLICKEY,
  REFRESH_TOKEN_PRIVATEKEY,
  REFRESH_TOKEN_PUBLICKEY,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  CORS_ORIGIN
} from '../utils/constants';
import { encryptToken, signTokenPayload } from '../utils/jwt';
import Shortcut from '../models/shortcut.model';
import SocialToken from '../models/socialToken.model';

export const registerUser: RequestHandler<
  ParamsDictionary,
  registerUserResBodyInterface,
  registerUserReqBodyInterface
> = async (req, res) => {
  try {
    const { password, email, username } = req.body;

    // Ensures that the fields are not undefined
    if (!password || !email || !username) {
      return res.status(400).json({
        code: 400,
        message: 'Username, password, email are all required'
      });
    }

    // Search for another user in the DB
    const userFound = await User.findOne({ email: email });

    if (userFound) {
      // Email already used, return error
      return res.status(409).json({
        code: 409,
        message: 'Email is already in use'
      });
    }

    // User is new, create a new User record
    const newUser = {
      username: username,
      email: email,
      password: await bcrypt.hash(password, 10)
    };
    await User.create(newUser);

    return res.status(201).json({
      code: 201,
      message: 'Registration is successful'
    });
  } catch (err) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};

export const loginUser: RequestHandler<
  ParamsDictionary,
  loginUserResBodyInterface,
  loginUserReqBodyInterface
> = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure fields are not undefined
    if (!password || !email) {
      return res.status(400).json({
        code: 400,
        message: 'Email and password are all required'
      });
    }

    // Search for another user in the DB
    const userFound = await User.findOne({ email: email });

    // If user not found, login fails
    if (!userFound) {
      return res.status(401).json({
        code: 401,
        message: 'Password and email combination is incorrect'
      });
    }

    // Password Comparison starts
    const passwordMatch = await bcrypt.compare(password, userFound.password);

    if (passwordMatch) {
      // Create Access Token
      const accessTokenPayload = {
        uuid: userFound.id
      };
      console.log("I AM HERE")

      const signedAccessToken = await signTokenPayload(
        ACCESS_TOKEN_PRIVATEKEY,
        accessTokenPayload,
        ACCESS_TOKEN_EXPIRY
      );

      console.log("I AM HERE 2")

      const encryptedAccessToken = await encryptToken(
        ENCRYPTION_PUBLICKEY,
        signedAccessToken
      );

      // Create Refresh Token
      const refreshTokenPayload = {
        uuid: userFound.id
      };

      const signedRefreshToken = await signTokenPayload(
        REFRESH_TOKEN_PRIVATEKEY,
        refreshTokenPayload,
        REFRESH_TOKEN_EXPIRY
      );

      // Save refreshToken with currentUser
      await userFound.updateOne({ refreshToken: signedRefreshToken });

      // Stpre refreshToken as cookie
      res.cookie('jwt', signedRefreshToken, {
        httpOnly: true,
        maxAge: REFRESH_TOKEN_EXPIRY * 1000
      });

      return res.status(200).json({
        code: 200,
        data: {
          accessToken: encryptedAccessToken,
          expiry: Date.now() + (ACCESS_TOKEN_EXPIRY - 10)*1000
        }
      });
    } else {
      return res.status(401).json({
        code: 401,
        message: 'Password and email combination is incorrect'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};

export const refreshUserAccess: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  // If no refresh token in request, user is not signed in / not even a user
  if (!cookies?.jwt) {
    return res.status(401).json({
      code: 401,
      message: 'Refresh token not found'
    });
  }
  const refreshToken: string = cookies.jwt;

  // Counter check if user is signed in according to DB
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    return res.status(403).json({
      code: 403,
      message: 'Refresh token is invalid'
    });
  }

  const refreshTokenPublicKey = REFRESH_TOKEN_PUBLICKEY.replace(/\\n/g, '\n');

  jwt.verify(refreshToken, refreshTokenPublicKey, async (err, decoded) => {
    console.log(err);
    console.log(decoded);
    console.log(
      foundUser.id !== (decoded as decodedRefreshTokenInteraface).uuid
    );
    if (
      err ||
      foundUser.id !== (decoded as decodedRefreshTokenInteraface).uuid
    ) {
      return res.status(403).json({
        code: 403,
        message: 'Refresh token validation failed'
      });
    }

    // Make a new access token
    const accessTokenPayload = {
      uuid: foundUser.id
    };

    const signedAccessToken = await signTokenPayload(
      ACCESS_TOKEN_PRIVATEKEY,
      accessTokenPayload,
      ACCESS_TOKEN_EXPIRY
    );
    const encryptedAccessToken = await encryptToken(
      ENCRYPTION_PUBLICKEY,
      signedAccessToken
    );

    return res.status(200).json({
      code: 200,
      data: {
        accessToken: encryptedAccessToken,
        expiry: Date.now() + (ACCESS_TOKEN_EXPIRY - 10)*1000
      }
    });
  });
};

export const logoutUser: RequestHandler = async (req, res) => {
  const cookies = req.cookies;

  // When there are no cookies, return 204
  if (!cookies?.jwt) {
    return res.status(204).json({
      code: 204,
      message: 'Logout Successful'
    });
  }
  const refreshToken: string = cookies.jwt;

  // Check if refreshToken in DB
  const userFound = await User.findOne({ refreshToken });

  // If token in DB, clear token
  if (userFound) {
    await userFound.updateOne({refreshToken: ''});
  }

  // clear cookie, return 204
  res.clearCookie('jwt', { httpOnly: true, maxAge: REFRESH_TOKEN_EXPIRY });
  return res.status(204).json({
    code: 204,
    message: 'Logout Successful'
  });
};

export const retrieveUserProfile: RequestHandler<ParamsDictionary, retrieveUserProfileResBodyInterface, retrieveUserProfileReqBodyInterface> = async (req, res) => {
  try {
    // Retrieved from accessToken
    const { uuid } = req.body

    const userFound = await User.findById(uuid);

    if (!userFound) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized entry'
      })
    }

    return res.status(200).json({
      code: 200,
      data: {
        username: userFound.username,
        hasSetPassword: userFound.password === undefined ? false : true
      }
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}

export const updateUsername: RequestHandler<ParamsDictionary, updateUsernameResBodyInterface, updateUsernameReqBodyInterface> = async (req, res) => {
  try {
    // Retrieved from accessToken
    const { uuid, username } = req.body

    const userFound = await User.findById(uuid)

    if (!userFound) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized entry'
      })
    }

    // Update username with new one
    await userFound.updateOne({ username })

    return res.status(204).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}

export const updatePassword: RequestHandler<ParamsDictionary, updatePasswordResBodyInterface, updatePasswordReqBodyInterface> = async (req, res) => {
  try {
    const { oldPassword, newPassword, uuid } = req.body

    const userFound = await User.findById(uuid)

    if (!userFound) {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized entry'
      })
    }

    if (!oldPassword) {
      // Make sure that there is no password stored in DB
      if (userFound.password !== oldPassword) {
        return res.status(400).json({
          code: 400,
          message: 'Password has already been set'
        })
      }
    } else {
      // Compare oldPassword with password in DB
      const passwordMatch = await bcrypt.compare(oldPassword, userFound.password);

      if (!passwordMatch) {
        return res.status(400).json({
          code: 400,
          message: 'Current Password is incorrect'
        })
      }
    }

    // Password matches, update with new Password
    await userFound.updateOne({ password: await bcrypt.hash(newPassword, 10) })

    return res.status(204).json({});

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}

export const deleteUserAccount: RequestHandler<ParamsDictionary, deleteUserAccountResBodyInterface, deleteUserAccountReqBodyInterface> = async (req, res) => {
  try {
    const { uuid } = req.body;

    // To delete all shortcuts first
    await Shortcut.deleteMany({ owner: uuid });;

    // To delete all social tokens if applicable
    await SocialToken.deleteOne({ userId: uuid });

    // To delete the user record
    await User.findByIdAndDelete(uuid);

    // redirect to main?
    return res.status(200).json({
      code: 200,
      redirect: CORS_ORIGIN
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      code: 500,
      message: 'Internal Server Error'
    });
  }
}
