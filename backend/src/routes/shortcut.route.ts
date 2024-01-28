import { Router } from 'express';
import {
  createShortcut,
  getShortcut,
  retrieveOwnerShortcutDetails
} from '../controllers/shortcut.controller';
import { verifyJWT } from '../middlewares/verifyJWT';
import { decryptJWT } from '../middlewares/decryptJWT';

const router = Router();

router.get('/retrieve/:shortcut', getShortcut);

// Initialise verifyJWT middleware
router.use(decryptJWT, verifyJWT);

router.post('/add', createShortcut);
router.get('/all', retrieveOwnerShortcutDetails);

export default router;
