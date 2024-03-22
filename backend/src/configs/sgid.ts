import { SgidClient } from '@opengovsg/sgid-client';
import {
  SGID_CLIENT_ID,
  SGID_CLIENT_SECRET,
  SGID_PRIVATE_KEY,
  SGID_REDIRECT_URI
} from '../utils/constants';

export const sgid = new SgidClient({
  clientId: SGID_CLIENT_ID,
  clientSecret: SGID_CLIENT_SECRET,
  privateKey: SGID_PRIVATE_KEY,
  redirectUri: SGID_REDIRECT_URI
});
