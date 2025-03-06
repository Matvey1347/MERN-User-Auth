import { Router } from 'express';
import { getUser, deleteUser, updateUser } from '../controllers/user';

export const router = Router();

router.get('/', getUser);
router.delete('/:userId', deleteUser);
router.put('/:userId', updateUser);