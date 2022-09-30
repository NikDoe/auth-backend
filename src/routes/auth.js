import { Router } from 'express';
import { handleLogin } from '../controllers/authController.js';

const router = Router();

router.post('/auth', handleLogin);

export default router;
