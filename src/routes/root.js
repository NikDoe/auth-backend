import { Router } from 'express';
import registerRouter from './register.js';
import authRouter from './auth.js';

const router = Router();

router.use('/', registerRouter);
router.use('/', authRouter);

export default router;
