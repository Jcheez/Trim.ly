import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  refreshUserAccess,
  registerUser
} from '../controllers/user.controller';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshUserAccess);
router.get('/logout', logoutUser)

export default router;
