import { Router } from 'express';
import { createShortcut } from '../controllers/shortcut.controller';
const router = Router();

router.post('/add', createShortcut);

export default router;
