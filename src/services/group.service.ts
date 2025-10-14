import GroupRepositories from "../repositories/group.repositories.ts";
import deletePhoto from "../utils/deletePhoto.ts";
import type {
  CreateGroupSchemaType,
  CreatePaidGroupSchemaType,
  UpdateFreeGroupSchemaType,
} from "../utils/schema/group.schema.ts";

import fs from "node:fs";

class GroupService {
  static async updatePhotoGroup(groupId: string, photo?: string) {
    const path = "public/assets/uploads/groups/photos";
    // cek dulu grupnya ada ga
    const findedGroup = await GroupRepositories.findGroupById(groupId);
    if (!findedGroup) {
      throw {
        type: "NotFound",
        success: false,
        message: "Group not found",
      };
    }
    if (photo || findedGroup.photo) {
      //hapus foto sebelumnya
      const lastPhoto = findedGroup.photo;
      const destination = path;
      // __dirname now starts from public directory
      const pathPhoto = `${destination}/${lastPhoto}`;
      // Use a proper logging mechanism here if needed
      console.log(pathPhoto, "<--- pathPhoto");

      if (fs.existsSync(pathPhoto) && lastPhoto) {
        console.log(pathPhoto, "<--- pathPhoto");

        deletePhoto([pathPhoto]);
      }
      // Use a proper logging mechanism here if needed
    }

    console.log({
      inputedPhoto: photo,
      lastPhoto: findedGroup.photo,
      path: `${path}/${findedGroup.photo}`,
    });

    const group = await GroupRepositories.updatePhotoGroup(groupId, photo);
    return group;
  }

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

  // !pisahkan update foto dan data lain

  static async updateFreeGroup(
    data: UpdateFreeGroupSchemaType,
    groupId: string
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
    const group = await GroupRepositories.updateGroupById(data, groupId);
    return group;
  }

  static async findGroupById(id: string) {
    const group = await GroupRepositories.findGroupById(id);
    return group;
  }
}

export default GroupService;
