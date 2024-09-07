import jose from 'node-jose';
import jwt from 'jsonwebtoken';

export const encryptToken = async (publicKey: string, payload: string) => {
  // Encrypting access token
  const encryptionPublicKey = publicKey.replace(/\\n/g, '\n');

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
  const accessTokenPrivateKey = privateKey.replace(/\\n/g, '\n');

  // Signing Access Token
  const signedAccessToken = jwt.sign(payload, accessTokenPrivateKey, {
    algorithm: 'RS256',
    expiresIn: expiry
  });

  return signedAccessToken;
};
