import { RequestHandler } from 'express';
import jose from 'node-jose';
import { ENCRYPTION_PRIVATEKEY } from '../utils/constants';

export const decryptJWT: RequestHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).send({
        code: 401,
        message: 'Authorization is missing'
      });
    }

    // Token is in the format Bearer xxxx, to filter out xxxx
    const token = authHeader.split(' ')[1];

    const encryptionPrivateKey = ENCRYPTION_PRIVATEKEY.replace(/\\n/g, '\n');

    // Import encryption key into node jose
    const encryptionKey = await jose.JWK.asKey(encryptionPrivateKey, 'pem');

    // Decrypting token
    jose.JWE.createDecrypt(encryptionKey)
      .decrypt(token)
      .then((res) => {
        // Converting decrypted token from buffer to string
        const decryptedAccessToken = Buffer.from(res.payload).toString();
        req.headers.authorization = decryptedAccessToken;
        next();
      })
      .catch((err) => {
        console.log(err);

        return res.status(403).send({
          code: 403,
          message: 'Unauthorized entry. Invalid token.'
        });
      });
  } catch (err) {
    return res.status(500).send({
      code: 500,
      message: 'Internal Server Error'
    });
  }
};
