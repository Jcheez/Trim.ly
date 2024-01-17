import jose from 'node-jose';
import jwt from 'jsonwebtoken';

export const encryptToken = async (publicKey: string, payload: string) => {
  // Encrypting access token
  const encryptionPublicKey = Buffer.from(publicKey, 'base64').toString();

  const encryptionKey = await jose.JWK.asKey(encryptionPublicKey, 'pem');
  const encryptedAccessToken = await jose.JWE.createEncrypt(
    { format: 'compact' },
    encryptionKey
  )
    .update(payload)
    .final();

  return encryptedAccessToken;
};

export const signTokenPayload = async (
  privateKey: string,
  payload: Object,
  expiry: number
) => {
  const accessTokenPrivateKey = Buffer.from(privateKey, 'base64').toString();

  // Signing Access Token
  const signedAccessToken = jwt.sign(payload, accessTokenPrivateKey, {
    algorithm: 'RS256',
    expiresIn: expiry
  });

  return signedAccessToken;
};
