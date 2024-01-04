import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import jose from 'node-jose';
import {
  ACCESS_TOKEN_PUBLICKEY,
  ENCRYPTION_PRIVATEKEY
} from '../utils/constants';
import {
  decodedTokenInteraface,
  verifyJWTReqBodyInterface,
  verifyJWTResBodyInterface
} from '../interfaces/middleware.interface';

export const verifyJWT: RequestHandler<
  ParamsDictionary,
  verifyJWTResBodyInterface,
  verifyJWTReqBodyInterface
> = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).send({
        code: 401,
        message: 'Authorization is missing'
      });
    }

    const token = authHeader.split(' ')[1];

    const accessTokenPublicKey = Buffer.from(
      ACCESS_TOKEN_PUBLICKEY,
      'base64'
    ).toString();

    const encryptionPrivateKey = Buffer.from(
      ENCRYPTION_PRIVATEKEY,
      'base64'
    ).toString();

    // Import encryption key into node jose
    const encryptionKey = await jose.JWK.asKey(encryptionPrivateKey, 'pem');

    // Decrypting token
    const decryptedAccessTokenBuffer = (
      await jose.JWE.createDecrypt(encryptionKey).decrypt(token)
    ).payload;

    // Converting decrypted token from buffer to string
    const decryptedAccessToken = Buffer.from(
      decryptedAccessTokenBuffer
    ).toString();

    // Verifying decrypted access tokenx
    jwt.verify(decryptedAccessToken, accessTokenPublicKey, (err, decoded) => {
      if (err) {
        return res.status(403).send({
          code: 403,
          message: 'Unauthorized entry. Invalid token.'
        });
      }
      req.body.uuid = (decoded as decodedTokenInteraface).uuid;
      next();
    });
  } catch (err) {
    return res.status(500).send({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};
