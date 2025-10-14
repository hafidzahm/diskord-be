import type { Response, NextFunction } from "express";
import GroupService from "../services/group.service.ts";
import type { CustomRequest } from "../types/custom.request.type.ts";
import {
  createFreeGroupSchema,
  createPaidGroupSchema,
  updateFreeGroupSchema,
} from "../utils/schema/group.schema.ts";

class GroupController {
  static async createFreeGroup(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedData = createFreeGroupSchema.safeParse(req.body);
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

      // validasi req.file
      if (!req.file) {
        throw {
          type: "BadRequest",
          success: false,
          message: "Image file required",
        };
      }

      const group = await GroupService.createFreeGroup(
        validatedData.data,
        req.file.filename,
        req?.user?.id as string
      );

      return res.status(201).json({
        success: true,
        message: "Free group created",
        data: group,
      });
    } catch (error) {
      next(error);
    }
  }

  static async createPaidGroup(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedData = createPaidGroupSchema.safeParse(req.body);
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

      const file = req.files as {
        photo?: Express.Multer.File[];
        assets?: Express.Multer.File[];
      };

      console.log(file, "<---- file");

      // validasi req.file
      if (!file.photo) {
        //hapus file assets jika dimasukan
        // const pathAssets = file.assets?.map((asset) => asset.path);
        // if ((pathAssets as string[]).length > 0) {
        //   for (const path of pathAssets as string[]) {
        //     deletePhoto(path);
        //   }
        // }
        // deletePhoto(pathAssets as string[], "assets");

        throw {
          type: "BadRequest",
          success: false,
          message: "Image file required",
        };
      }

      if (!file.assets) {
        // const path = file?.photo[0]?.path;
        //jika ada file foto, hapus ftonya
        // file.photo && deletePhoto(path as string, "photo");

        throw {
          type: "BadRequest",
          success: false,
          message: "Assets file required",
        };
      }

      const assets = file?.assets?.map((asset) => asset.filename); //looping
      const group = await GroupService.createPaidGroup(
        validatedData.data,
        file?.photo[0]?.filename as string,
        req?.user?.id as string,
        assets
      );

      return res.status(201).json({
        success: true,
        message: "Paid group created",
        data: group,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateFreeGroup(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedData = updateFreeGroupSchema.safeParse(req.body);
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

      const file = req?.file?.filename;
      console.log(req?.file, "<----- file");
      const destination = req?.file?.destination;

      const { groupId } = req?.params;

      const group = await GroupService.updateFreeGroup(
        validatedData.data,
        groupId as string,
        file,
        destination
      );

      return res.status(200).json({
        success: true,
        message: "Free group updated",
        data: group,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getGroupById(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { groupId } = req.params;
      const group = await GroupService.findGroupById(groupId as string);
      return res.status(200).json({
        success: true,
        data: group,
      });
    } catch (error) {
      next(error);
    }
  }
}
export default GroupController;
