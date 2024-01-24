import { Router } from 'express';
import {
  createShortcut,
  getShortcut,
  retrieveOwnerShortcutDetails
} from '../controllers/shortcut.controller';
const router = Router();

router.post('/add', createShortcut);
router.get('/retrieve/:shortcut', getShortcut);
router.get('/all', retrieveOwnerShortcutDetails)

export default router;
