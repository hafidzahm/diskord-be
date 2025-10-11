import type { NextFunction, Request, Response } from "express";
import { SignInSchema, SignUpSchema } from "../utils/schema/user.schema.ts";
import fs from "fs";
import UserService from "../services/user.service.ts";
import deletePhoto from "../utils/deletePhoto.ts";

class UserController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      //cek req.file ada atau tidak
      if (!req.file) {
        throw {
          type: "BadRequest",
          success: false,
          message: "Upload photo is required",
        };
      }

      //cek req.body
      const parse = SignUpSchema.safeParse(req.body);

      if (!parse.success) {
        const errorMessages = parse.error.issues.map(
          (err) => `${err.path} - ${err.message}`
          // name - name must string
        );

        // hapus file yang terupload
        // fs.unlinkSync(req.file.path);

        deletePhoto(req.file.path);

        throw {
          type: "ZodValidationError",
          success: false,
          message: "Validation error",
          details: errorMessages,
        };
      }

      //bila semua validasi terpenuhi
      const newUser = await UserService.signUp(parse.data, req.file);
      //return
      return res.status(201).json({
        success: true,
        message: "Create user success",
        data: newUser,
      });
    } catch (error) {
      console.log(error, "=== signUp error log ===");
      next(error);
    }
  }

  static async signIn(req: Request, res: Response, next: NextFunction) {
    //validasi schema signin

    const validatedData = SignInSchema.safeParse(req.body);

    if (!validatedData.success) {
      const errorMessages = validatedData.error.issues.map(
        (err) => `${err.path} - ${err.message}`
        // name - name must string
      );

      throw {
        type: "ZodValidationError",
        success: false,
        message: "Validation error",
        details: errorMessages,
      };
    }
  }
}

export default UserController;
