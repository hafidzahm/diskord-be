import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import type { ErrorClientType } from "../types/error.client.type.ts";
import deletePhoto from "../utils/deletePhoto.ts";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const catchError = err;
  console.log(`===${(err as ErrorClientType).type}===`);

  console.log(catchError, "=== middleware error ===");
  console.log(req.file?.path, "<--- filePathDetected");

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("===PrismaClientKnownRequestError===");

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if ((err as ErrorClientType).type === "BadRequest") {
    console.log("===BadRequest===");

    deletePhoto(req.file?.path as string);
    return res.status(400).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
    });
  }

  if ((err as ErrorClientType).type === "ZodValidationError") {
    console.log("===ZodValidationError===");

    return res.status(400).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
      details: (err as ErrorClientType).details,
    });
  }

  if ((err as ErrorClientType).type === "AuthenticationError") {
    console.log("===AuthenticationError===");
    return res.status(401).json({
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
