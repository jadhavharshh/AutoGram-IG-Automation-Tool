import { Router } from 'express';
import { AddIGAccount, GetIGAccounts } from '../controllers/InstagramController';
import { verifyUser } from '../middleware/AuthMiddleware';


const IGRoutes = Router();
IGRoutes.post('/add-ig-account', verifyUser, AddIGAccount);
IGRoutes.get('/get-ig-accounts', verifyUser, GetIGAccounts);


export default IGRoutes;    