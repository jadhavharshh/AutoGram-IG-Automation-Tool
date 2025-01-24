import { Router } from "express";
import { verifyUser } from "../middleware/AuthMiddleware";
import { scrapeFunction } from "../controllers/ScrapeController";

const scrapeRoutes = Router();

scrapeRoutes.post("/scrape-profiles", verifyUser, scrapeFunction);