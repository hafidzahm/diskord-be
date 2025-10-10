import "multer"; // This loads the global types
import type { SignUpSchemaType } from "../utils/schema/user.schema.js";
import UserRepositories from "../repositories/user.repositories.js";
import bcrypt from "bcrypt";

class UserService {
  static async signUp(data: SignUpSchemaType, file: Express.Multer.File) {
    const isEmailExist = await UserRepositories.isEmailExist(data.email);
    if (isEmailExist > 1) {
      throw new Error("Email must be unique");
    }

    const user = await UserRepositories.createUser(
      {
        ...data,
        password: bcrypt.hashSync(
          data.password,
          process.env.SECRET_KEY_BCRYPT as string
        ),
      },
      file.filename
    );
  }
}

export default UserService;
