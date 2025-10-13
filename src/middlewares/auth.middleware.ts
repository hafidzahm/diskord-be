import type { Request, Response, NextFunction } from "express";

export default function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {}
