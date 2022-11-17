import { Router } from 'express';
import { getAllUsers, deleteUser, getUser } from '../../controllers/usersController.js';

const router = Router();

router.get('/users', getAllUsers);
router.delete('/users', deleteUser);
router.get('/users/:id', getUser);

export default router;
