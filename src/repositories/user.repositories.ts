import type { RoleType } from "@prisma/client";
import prisma from "../utils/prisma.ts";
import type { SignUpSchemaType } from "../utils/schema/user.schema.ts";

class UserRepositories {
  static async isEmailExist(email: string) {
    return await prisma.user.count({
      where: {
        email: email,
      },
    });
  }

  static async findRole(role: RoleType) {
    return await prisma.role.findFirstOrThrow({
      where: {
        role: role,
      },
    });
  }

  static async createUser(data: SignUpSchemaType, photo: string) {
    const role = await this.findRole("USER");
    return await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password,
        photo: photo,
        RoleId: role.id,
      },
    });
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }
}

export default UserRepositories;
