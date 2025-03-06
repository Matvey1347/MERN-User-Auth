import { Router } from 'express';
import { login, register, forgotPassword, resetPassword } from '../controllers/auth';

export const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password', resetPassword);