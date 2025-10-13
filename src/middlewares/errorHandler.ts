import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import type { ErrorClientType } from "../types/error.client.type.ts";
import deletePhoto from "../utils/deletePhoto.ts";
import pkg from "jsonwebtoken";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const file = req.files as {
    photo?: Express.Multer.File[];
    assets?: Express.Multer.File[];
  };

  const path = req?.file?.path;
  const photoPath = file?.photo?.map((photo) => photo.path)[0];
  const pathMap = file?.assets?.map((asset) => asset.path);
  const assetPath = pathMap;

  // !BUG: VALIDASI DELETE PHOTO TIDAK TERHAPUS KETIKA ZOD ERROR
  const pathSelectValidation =
    (path as string) || (photoPath as string) || (assetPath as string[]);

  const catchError = err;
  console.log(`===${(err as ErrorClientType).type}===`);

  console.log(catchError, "=== middleware error ===");
  console.log(pathSelectValidation, "<--- filePathDetected");

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    console.log("===PrismaClientKnownRequestError===");

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  const { JsonWebTokenError } = pkg;
  if (err instanceof JsonWebTokenError) {
    console.log(err, "<----JWTERROR");
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }

  if ((err as ErrorClientType).type === "BadRequest") {
    console.log("===BadRequest===");

    deletePhoto(pathSelectValidation);
    return res.status(400).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
    });
  }

  if ((err as ErrorClientType).type === "NotFound") {
    console.log("===NotFound===");

    deletePhoto(pathSelectValidation);
    return res.status(404).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
    });
  }

  if ((err as ErrorClientType).type === "AuthenticationError") {
    console.log("===AuthenticationError===");

    deletePhoto(pathSelectValidation);
    return res.status(401).json({
      success: (err as ErrorClientType).success,
      message: (err as ErrorClientType).message,
    });
  }

  if ((err as ErrorClientType).type === "ZodValidationError") {
    console.log("===ZodValidationError===");

    deletePhoto(pathSelectValidation);
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
