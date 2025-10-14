import GroupRepositories from "../repositories/group.repositories.ts";
import deletePhoto from "../utils/deletePhoto.ts";
import type {
  CreateGroupSchemaType,
  CreatePaidGroupSchemaType,
  UpdateFreeGroupSchemaType,
} from "../utils/schema/group.schema.ts";

import fs from "node:fs";
import path from "node:path";

class GroupService {
  static async createFreeGroup(
    data: CreateGroupSchemaType,
    photo: string,
    userId: string
  ) {
    const group = GroupRepositories.createFreeGroup(data, photo, userId);
    return group;
  }

  static async createPaidGroup(
    data: CreatePaidGroupSchemaType,
    photo: string,
    userId: string,
    assets?: string[]
  ) {
    const group = await GroupRepositories.createPaidGroup(
      data,
      userId,
      photo,
      assets
    );

    return group;
  }

  static async updateFreeGroup(
    data: UpdateFreeGroupSchemaType,
    groupId: string,
    photo?: string
  ) {
    // cek dulu grupnya ada ga
    const findedGroup = await GroupRepositories.findGroupById(groupId);
    if (!findedGroup) {
      throw {
        type: "NotFound",
        success: false,
        message: "Group not found",
      };
    }
    if (photo) {
      //hapus foto sebelumnya
      const lastPhoto = findedGroup.photo;
      const pathPhoto = path.join(
        __dirname,
        "/../../public/assets/uploads/groups/photos",
        lastPhoto
      );

      if (fs.existsSync(pathPhoto)) {
        deletePhoto([pathPhoto]);
      }
    }

    const group = await GroupRepositories.updateGroupById(data, groupId, photo);
    return group;
  }

  static async findGroupById(id: string) {
    const group = await GroupRepositories.findGroupById(id);
    return group;
  }
}

export default GroupService;
