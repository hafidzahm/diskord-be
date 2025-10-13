import prisma from "../utils/prisma.ts";
import type { CreateGroupSchemaType } from "../utils/schema/group.schema.ts";
import UserRepositories from "./user.repositories.ts";

class GroupRepositories {
  static async createFreeGroup(
    data: CreateGroupSchemaType,
    photo: string,
    userId: string
  ) {
    // cari role lewat id role
    const owner = await UserRepositories.findRole("OWNER");
    return await prisma.group.create({
      data: {
        about: data.about,
        name: data.name,
        photo: photo,
        price: 0,
        type: "FREE",
        room: {
          //relasi ke Table Room
          create: {
            CreatorId: userId,
            name: data.name,
            is_group: true,
            room_members: {
              //relasi ke Table RoomMember
              create: {
                UserId: userId,
                RoleId: owner.id,
              },
            },
          },
        },
      },
    });
  }
}

export default GroupRepositories;
