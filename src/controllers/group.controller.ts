import type { Response, NextFunction } from "express";
import GroupService from "../services/group.service.ts";
import type { CustomRequest } from "../types/custom.request.type.ts";
import { createFreeGroupSchema } from "../utils/schema/group.schema.ts";

class GroupController {
  static async createFreeGroup(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
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
  }
}
export default GroupController;
