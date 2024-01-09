import { Router } from 'express';
import {
  createShortcut,
  getShortcut
} from '../controllers/shortcut.controller';
const router = Router();

router.post('/add', createShortcut);
router.get('/retrieve/:shortcut', getShortcut);

export default router;
