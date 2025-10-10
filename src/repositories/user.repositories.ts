import prisma from "../utils/prisma.js";

class UserRepositories {
  static async isEmailExist(email: string) {
    return await prisma.user.count({
      where: {
        email: email,
      },
    });
  }
}

export default UserRepositories;
