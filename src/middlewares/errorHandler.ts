import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import type { ErrorClientType } from "../types/error.client.type.ts";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const catchError = err;
  console.log(catchError, "=== middleware error ===");

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if ((err as ErrorClientType).type === "BadRequest") {
    return res.status(400).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
    });
  }

  if ((err as ErrorClientType).type === "ZodValidationError") {
    return res.status(400).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
      details: (err as ErrorClientType).details,
    });
  }

  return res.status(500).json({
    success: false,
    message: catchError?.message ?? "Internal server error",
  });
}
