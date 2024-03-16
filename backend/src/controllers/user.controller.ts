import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import {
  registerUserReqBodyInterface,
  registerUserResBodyInterface,
  loginUserResBodyInterface,
  loginUserReqBodyInterface,
  decodedRefreshTokenInteraface
} from '../interfaces/user.interface';
import User from '../models/user.model';
import {
  ACCESS_TOKEN_PRIVATEKEY,
  ENCRYPTION_PUBLICKEY,
  REFRESH_TOKEN_PRIVATEKEY,
  REFRESH_TOKEN_PUBLICKEY,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY
} from '../utils/constants';
import { encryptToken, signTokenPayload } from '../utils/jwt';

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

      const signedAccessToken = await signTokenPayload(
        ACCESS_TOKEN_PRIVATEKEY,
        accessTokenPayload,
        ACCESS_TOKEN_EXPIRY
      );
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
        data: { accessToken: encryptedAccessToken }
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

  const refreshTokenPublicKey = Buffer.from(
    REFRESH_TOKEN_PUBLICKEY,
    'base64'
  ).toString();

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
      3600
    );
    const encryptedAccessToken = await encryptToken(
      ENCRYPTION_PUBLICKEY,
      signedAccessToken
    );

    return res.status(200).json({
      code: 200,
      data: { accessToken: encryptedAccessToken }
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
    await userFound.updateOne({}, { $unset: { refreshToken: '' } });
  }

  // clear cookie, return 204
  res.clearCookie('jwt', { httpOnly: true, maxAge: REFRESH_TOKEN_EXPIRY });
  return res.status(204).json({
    code: 204,
    message: 'Logout Successful'
  });
};
