import { Router } from 'express';
import { handleLogout } from '../controllers/logoutController.js';

const router = Router();

router.get('/logout', handleLogout);

export default router;
