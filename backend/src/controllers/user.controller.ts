import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';
import jose from 'node-jose';
import {
  registerUserReqBodyInterface,
  registerUserResBodyInterface,
  loginUserResBodyInterface,
  loginUserReqBodyInterface
} from '../interfaces/user.interface';
import User from '../models/user.model';
import {
  ACCESS_TOKEN_PRIVATEKEY,
  ENCRYPTION_PUBLICKEY,
  REFRESH_TOKEN_PRIVATEKEY
} from '../utils/constants';

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
      const accessTokenPrivateKey = Buffer.from(
        ACCESS_TOKEN_PRIVATEKEY,
        'base64'
      ).toString();

      const accessTokenPayload = {
        uuid: userFound._id
      };

      // Signing Access Token
      const accessToken = jwt.sign(accessTokenPayload, accessTokenPrivateKey, {
        algorithm: 'RS256',
        expiresIn: 3600
      });

      // Encrypting access token
      const encryptionPublicKey = Buffer.from(
        ENCRYPTION_PUBLICKEY,
        'base64'
      ).toString();

      const encryptionKey = await jose.JWK.asKey(encryptionPublicKey, 'pem');
      const encryptedAccessToken = await jose.JWE.createEncrypt(
        { format: 'compact' },
        encryptionKey
      )
        .update(accessToken)
        .final();

      // Create Refresh Token
      const refreshTokenPrivateKey = Buffer.from(
        REFRESH_TOKEN_PRIVATEKEY,
        'base64'
      ).toString();

      const refreshTokenPayload = {
        uuid: userFound._id
      };

      const refreshToken = jwt.sign(
        refreshTokenPayload,
        refreshTokenPrivateKey,
        { algorithm: 'RS256', expiresIn: 60 * 60 * 24 }
      );

      // Save refreshToken with currentUser
      await userFound.updateOne({ refreshToken });

      // Stpre refreshToken as cookie
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000
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
