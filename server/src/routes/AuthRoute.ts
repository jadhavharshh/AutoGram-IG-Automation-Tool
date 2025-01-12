import { Router } from 'express';
import { getUserInfo, SignIn, SignUp, verifyOTP } from '../controllers/AuthController';
import { verifyUser } from '../middleware/AuthMiddleware';

const authRoutes = Router();
authRoutes.post('/sign-up' , SignUp);
authRoutes.post('/verify-otp', verifyOTP)
authRoutes.post('/sign-in' , SignIn);
authRoutes.get('/get-user-info', verifyUser, getUserInfo);
export default authRoutes;