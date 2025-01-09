import { Router } from 'express';
import { SignIn, SignUp } from '../controllers/AuthController';

const authRoutes = Router();
authRoutes.post('/sign-up' , SignUp);
authRoutes.post('/sign-in' , SignIn);

export default authRoutes;