import "multer"; // This loads the global types
import type { SignUpSchemaType } from "../utils/schema/user.schema.js";
import UserRepositories from "../repositories/user.repositories.js";

class UserService {
  static async signUp(data: SignUpSchemaType, file: Express.Multer.File) {
    const isEmailExist = await UserRepositories.isEmailExist(data.email);
    if (isEmailExist > 1) {
      throw new Error("Email must be unique");
    }
  }
}

export default UserService;
