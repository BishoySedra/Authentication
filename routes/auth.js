import { Router } from "express";
import * as authController from "../controllers/auth.js";

const router = Router();

router.get("/login", authController.login);
router.post("/login", authController.postLogin);

router.get("/signup", authController.signup);
router.post("/signup", authController.postSignup);

router.get("/logout", authController.logout);

router.get("/profile", authController.profile);

export default router;

