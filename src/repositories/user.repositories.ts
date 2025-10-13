import type { RoleType } from "@prisma/client";
import prisma from "../utils/prisma.ts";
import type { SignUpSchemaType } from "../utils/schema/user.schema.ts";
import crypto from "node:crypto";

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

  static async createPasswordReset(email: string) {
    //cari user lewat email
    const user = await this.findUserByEmail(email);
    //random byte
    const token = crypto.randomBytes(32).toString("hex");

    return await prisma.passwordReset.create({
      data: {
        UserId: user.id,
        token: token,
      },
    });
  }

  static async findResetDataByTokenId(token: string) {
    return await prisma.passwordReset.findFirst({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });
  }

  static async updatePassword(userId: string, password: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });
  }

  static async deleteTokenResetById(tokenId: string) {
    return await prisma.passwordReset.delete({
      where: {
        id: tokenId,
      },
    });
  }

  static async findUserById(id: string) {
    return await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
  }
}

export default UserRepositories;
