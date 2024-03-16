import { SgidClient } from '@opengovsg/sgid-client';
import {
  SERVER_PORT,
  SGID_CLIENT_ID,
  SGID_CLIENT_SECRET,
  SGID_PRIVATE_KEY
} from '../utils/constants';

export const sgid = new SgidClient({
  clientId: SGID_CLIENT_ID,
  clientSecret: SGID_CLIENT_SECRET,
  privateKey: SGID_PRIVATE_KEY,
  redirectUri: `http://localhost:${SERVER_PORT}/api/oauth/sgid/redirect`
});
