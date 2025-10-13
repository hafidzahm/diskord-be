import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserRepositories from "../repositories/user.repositories.ts";
import type { CustomJwtPayload } from "../types/payload.type.ts";
import type { CustomRequest } from "../types/custom.request.type.ts";
//AuthMiddleware
export default async function AuthMiddleware(
  req: CustomRequest,
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

  //find user by id, id founded by decoded.id
  const userId = (decoded as CustomJwtPayload).id;
  const user = await UserRepositories.findUserById(userId);
  console.log(user, "<---- findedUser");
  if (!user) {
    throw {
      type: "AuthenticationError",
      success: false,
      message: "Invalid token",
    };
  }

  req.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role.role,
  };

  next();
}
