import { Router } from 'express';
import {
  loginUser,
  refreshUserAccess,
  registerUser
} from '../controllers/user.controller';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/refresh', refreshUserAccess);

export default router;
