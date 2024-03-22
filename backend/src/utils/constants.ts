import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT || '3000';

export const MONGO_DB_URL = process.env.MONGO_DB_URL || '';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || '';

export const ACCESS_TOKEN_PUBLICKEY = process.env.ACCESS_TOKEN_PUBLICKEY || '';

export const ACCESS_TOKEN_PRIVATEKEY =
  process.env.ACCESS_TOKEN_PRIVATEKEY || '';

export const ENCRYPTION_PUBLICKEY = process.env.ENCRYPTION_PUBLICKEY || '';

export const ENCRYPTION_PRIVATEKEY = process.env.ENCRYPTION_PRIVATEKEY || '';

export const REFRESH_TOKEN_PUBLICKEY =
  process.env.REFRESH_TOKEN_PUBLICKEY || '';

export const REFRESH_TOKEN_PRIVATEKEY =
  process.env.REFRESH_TOKEN_PRIVATEKEY || '';

export const ACCESS_TOKEN_EXPIRY = parseInt(
  process.env.ACCESS_TOKEN_EXPIRY || '120',
  10
);

export const REFRESH_TOKEN_EXPIRY = parseInt(
  process.env.REFRESH_TOKEN_EXPIRY || '86400',
  10
);

export const SGID_CLIENT_ID = String(process.env.SGID_CLIENT_ID || '');

export const SGID_CLIENT_SECRET = String(process.env.SGID_CLIENT_SECRET || '');

export const SGID_PRIVATE_KEY = String(process.env.SGID_PRIVATE_KEY || '');
