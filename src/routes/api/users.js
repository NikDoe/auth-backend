import { Router } from 'express';
import { getAllUsers, deleteUser, getUser } from '../../controllers/usersController.js';
import { verifyRoles } from '../../middleware/verifyRoles.js';
import ROLES_LIST from '../../config/roles_list.js';

const router = Router();

router.get('/users', verifyRoles(ROLES_LIST.Admin), getAllUsers);
router.delete('/users', verifyRoles(ROLES_LIST.Admin), deleteUser);
router.get('/users/:id', verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
