import { Router } from "express";
import * as authController from "./authController";
import { validateRequest } from "../../../shared/middleware";
import { loginSchema, registerSchema, refreshTokenSchema } from "./validation";

const router = Router();

// public routes
router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register
);

router.post("/login", validateRequest(loginSchema), authController.login);
router.post(
  "/refresh-token",
  validateRequest(refreshTokenSchema),
  authController.refreshToken
);
router.post(
  "/logout",
  validateRequest(refreshTokenSchema),
  authController.logout
);

// token validation endpoint (for other services to validate token)
router.post("/validate", authController.validateToken);

// protected routes
router.get("/profile", authController.getProfile);
router.delete("/profile", authController.deleteAccount);

export default router;
