import { Router } from 'express';
import { handleRefreshToken } from '../controllers/refreshTokenController.js';

const router = Router();

router.get('/refresh', handleRefreshToken);

export default router;
