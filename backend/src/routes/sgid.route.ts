import { Router } from 'express';
import { createAuthorizationUrl, retrieveAccessTokenAndSub } from '../controllers/sgid.controller';

const router = Router();

router.get('/authurl', createAuthorizationUrl);
router.get('/redirect', retrieveAccessTokenAndSub)

export default router;
