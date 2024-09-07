import { RequestHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_PUBLICKEY } from '../utils/constants';
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
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).send({
        code: 401,
        message: 'Authorization is missing'
      });
    }

    const accessTokenPublicKey = ACCESS_TOKEN_PUBLICKEY.replace(/\\n/g, '\n');

    // Verifying decrypted access tokenx
    jwt.verify(token, accessTokenPublicKey, (err, decoded) => {
      if (err && err.name === 'TokenExpiredError') {
        return res.status(403).send({
          code: 403,
          message: 'Token expired'
        });
      } else if (err) {
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
