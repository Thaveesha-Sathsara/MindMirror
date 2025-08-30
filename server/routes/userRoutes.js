import { Router } from "express";
import { ensureAuth } from "../middleware/auth.js";
import { me } from "../controllers/userController.js";

const router = Router();
router.get("/me", ensureAuth, me);
export default router;
