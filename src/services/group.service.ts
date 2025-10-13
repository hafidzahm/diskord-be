import GroupRepositories from "../repositories/group.repositories.ts";
import type {
  CreateGroupSchemaType,
  CreatePaidGroupSchemaType,
} from "../utils/schema/group.schema.ts";

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
}

export default GroupService;
