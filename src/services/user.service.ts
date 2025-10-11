import "multer"; // This loads the global types
import type { SignUpSchemaType } from "../utils/schema/user.schema.ts";
import UserRepositories from "../repositories/user.repositories.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  static async signUp(data: SignUpSchemaType, file: Express.Multer.File) {
    const isEmailExist = await UserRepositories.isEmailExist(data.email);
    console.log(isEmailExist, "<--- emailCount");

    if (isEmailExist > 0) {
      throw {
        type: "BadRequest",
        success: false,
        message: "Email must be unique",
      };
    }

    const user = await UserRepositories.createUser(
      {
        ...data,
        password: bcrypt.hashSync(data.password, 12),
      },
      file.filename
    );

    const access_token = jwt.sign(
      { id: user.id },
      process.env.SECRET_AUTH as string,
      {
        expiresIn: "1 days",
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo_url,
      access_token,
    };
  }
}

export default UserService;
