import { Router } from 'express';
import { AddIGAccount, GetIGAccounts } from '../controllers/InstagramController';
import { verifyUser } from '../middleware/AuthMiddleware';
import { scrapeFunction } from '../controllers/ScrapeController';


const IGRoutes = Router();
IGRoutes.post('/add-ig-account', verifyUser, AddIGAccount);
IGRoutes.get('/get-ig-accounts', verifyUser, GetIGAccounts);
IGRoutes.post("/scrape-profiles", verifyUser, scrapeFunction);


export default IGRoutes;    