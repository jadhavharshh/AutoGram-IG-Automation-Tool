import { Router } from 'express';
import { getUserInfo, LogOut, resetPasswordHandler, sendOTPForgotPasswordHandler, SignIn, SignUp, verifyOTP } from '../controllers/AuthController';
import { verifyUser } from '../middleware/AuthMiddleware';

const authRoutes = Router();
authRoutes.post('/sign-up' , SignUp);
authRoutes.post('/verify-otp', verifyOTP)
authRoutes.post('/sign-in' , SignIn);
authRoutes.get('/get-user-info', verifyUser, getUserInfo);
authRoutes.post('/log-out', verifyUser , LogOut);
authRoutes.post('/send-otp', sendOTPForgotPasswordHandler);
authRoutes.post('/reset-password', resetPasswordHandler);
export default authRoutes;