import { Router } from 'express';
import {
  deleteUserAccount,
  loginUser,
  logoutUser,
  refreshUserAccess,
  registerUser,
  retrieveUserProfile,
  updatePassword,
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
router.put('/update/pw', updatePassword)
router.delete('/delete', deleteUserAccount)

export default router;
