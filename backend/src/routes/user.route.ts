import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserAccess,
  registerUser,
  retrieveUserProfile,
  updateUsername
} from '../controllers/user.controller';
import { decryptJWT } from '../middlewares/decryptJWT';
import { verifyJWT } from '../middlewares/verifyJWT';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshUserAccess);
router.get('/logout', logoutUser);

// Initialise verifyJWT middleware
router.use(decryptJWT, verifyJWT);

router.get('/profile', retrieveUserProfile)
router.put('/update/name', updateUsername)

export default router;
