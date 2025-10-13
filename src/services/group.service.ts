import GroupRepositories from "../repositories/group.repositories.ts";
import type { CreateGroupSchemaType } from "../utils/schema/group.schema.ts";

class GroupService {
  static async createFreeGroup(
    data: CreateGroupSchemaType,
    photo: string,
    userId: string
  ) {
    const group = GroupRepositories.createFreeGroup(data, photo, userId);
    return group;
  }
}

export default GroupService;
