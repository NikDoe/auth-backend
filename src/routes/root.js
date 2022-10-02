import { Router } from 'express';
import registerRouter from './register.js';
import authRouter from './auth.js';
import testProtectedRouter from './protectedRoute.js';
import refreshRoute from './refresh.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = Router();

router.use('/', registerRouter);
router.use('/', authRouter);
router.use('/', refreshRoute); // always before protected routes
router.use('/', verifyJWT, testProtectedRouter);

export default router;
