import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

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

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    throw {
      type: "AuthenticationError",
      success: false,
      message: "Invalid token",
    };
  }

  const decoded = jwt.verify(
    token as string,
    process.env.SECRET_AUTH as string
  );

  console.log(decoded, "<---- decoded");

  next();
}
