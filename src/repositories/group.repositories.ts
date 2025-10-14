import prisma from "../utils/prisma.ts";
import type {
  CreateGroupSchemaType,
  CreatePaidGroupSchemaType,
  UpdateFreeGroupSchemaType,
} from "../utils/schema/group.schema.ts";
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

  static async findGroupById(id: string) {
    return await prisma.group.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  static async updateGroupById(
    data: UpdateFreeGroupSchemaType,
    groupId: string,
    photo?: string
  ) {
    return prisma.group.update({
      where: {
        id: groupId,
      },
      data: {
        name: data.name,
        about: data.about,
        photo: photo ?? "",
      },
    });
  }

  static async createPaidGroup(
    data: CreatePaidGroupSchemaType,
    userId: string,
    photo: string,
    assets?: string[]
  ) {
    const owner = await UserRepositories.findRole("OWNER");
    const group = await prisma.group.create({
      data: {
        name: data.name,
        about: data.about,
        benefit: data.benefit,
        photo: photo,
        price: Number(data.price),
        type: "PAID",
        room: {
          //relasi ke Table Room
          create: {
            CreatorId: userId,
            name: data.name,
            is_group: true,
            room_members: {
              //relasi ke Table RoomMember
              create: {
                RoleId: owner.id,
                UserId: userId,
              },
            },
          },
        },
      },
    });

    //looping dan masukkan asset
    if (assets) {
      for (const asset of assets) {
        await prisma.groupAsset.create({
          data: {
            GroupId: group.id,
            filename: asset,
          },
        });
      }
    }

    return group;
  }
}

export default GroupRepositories;
