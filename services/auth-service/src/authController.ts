import { asyncHandler } from "../../../shared/middleware";
import { AuthService } from "./authService";
import { Request, Response, NextFunction } from "express";
import {
  createFailureResponse,
  createSuccessResponse,
} from "../../../shared/utils";

const authService = new AuthService();

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.register(email, password);

  return res
    .status(201)
    .json(createSuccessResponse(tokens, "User registered successfully"));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const tokens = await authService.login(email, password);

  return res
    .status(201)
    .json(createSuccessResponse(tokens, "User logged in successfully"));
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);

    return res
      .status(200)
      .json(createSuccessResponse(tokens, "Token refresh successfully"));
  }
);

export const validateToken = asyncHandler(
  async (req: Request, res: Response) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json(createFailureResponse("No token provided"));
    }
    const tokens = await authService.validateToken(String(token));

    return res
      .status(200)
      .json(createSuccessResponse(tokens, "Token is valid"));
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const validateToken = await authService.validateToken(refreshToken);
  if (!validateToken) {
    res.status(401).json(createFailureResponse("Invalid token provided"));
  }
  await authService.logout(refreshToken);

  return res
    .status(200)
    .json(createSuccessResponse(null, "User logout successfully"));
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    res.status(401).json(createFailureResponse("Unauthorized"));
  }
  const profile = await authService.getUserById(userId);
  if (!profile) {
    res.status(401).json(createFailureResponse("User not found"));
  }

  return res
    .status(200)
    .json(createSuccessResponse(profile, "User profile retrieved"));
});

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json(createFailureResponse("Unauthorized"));
    }
    await authService.deleteUser(userId);

    return res
      .status(200)
      .json(createSuccessResponse(null, "Account delete succefully"));
  }
);
