import type { Request, Response, NextFunction } from "express";

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req?.headers?.authorization;
  if (!authorization) {
    throw {
      type: "AuthenticationError",
      success: false,
      message: "Invalid token",
    };
  }
  next();
}
