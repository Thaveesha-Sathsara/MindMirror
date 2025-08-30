import { Router } from "express";
import passport from "passport";
import { authSuccess, logout, getCurrentUser } from "../controllers/authController.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  authSuccess
);

router.post("/logout", logout);
router.get("/me", getCurrentUser);

export default router;
