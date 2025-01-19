import { Router } from 'express';
import { AddIGAccount } from '../controllers/InstagramController';
import { verifyUser } from '../middleware/AuthMiddleware';


const IGRoutes = Router();
IGRoutes.post('/add-ig-account', verifyUser, AddIGAccount);

export default IGRoutes;    