import "multer"; // This loads the global types
import type {
  SignInSchemaType,
  SignUpSchemaType,
} from "../utils/schema/user.schema.ts";
import UserRepositories from "../repositories/user.repositories.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { mailtrap } from "../utils/mailtrap.ts";

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

  static async signIn(data: SignInSchemaType) {
    const isEmailExist = await UserRepositories.isEmailExist(data.email);
    console.log(isEmailExist, "<--- emailFoundCount");

    //cek apakah email yang diinputkan user ada dan dicount
    if (isEmailExist === 0) {
      console.log("Inputted email not found");

      throw {
        type: "AuthenticationError",
        success: false,
        message: "Invalid email/ password",
      };
    }
    //cek user dari email yang ditemukan
    const findedUserByEmail = await UserRepositories.findUserByEmail(
      data.email
    );
    //bandingkan password db dgn password yg diinput
    const comparePassword = bcrypt.compareSync(
      data.password,
      findedUserByEmail.password
    );

    if (!comparePassword) {
      console.log("Invalid password");

      throw {
        type: "AuthenticationError",
        success: false,
        message: "Invalid email/ password",
      };
    }

    const access_token = jwt.sign(
      { id: findedUserByEmail.id },
      process.env.SECRET_AUTH as string,
      {
        expiresIn: "1 days",
      }
    );

    return {
      id: findedUserByEmail.id,
      name: findedUserByEmail.name,
      email: findedUserByEmail.email,
      photo: findedUserByEmail.photo_url,
      access_token,
    };
  }

  static async getEmailReset(email: string) {
    const isEmailExist = await UserRepositories.isEmailExist(email);
    console.log(isEmailExist, "<--- emailFoundCount");

    //cek apakah email yang diinputkan user ada dan dicount
    if (isEmailExist === 0) {
      console.log("Inputted email not found");

      throw {
        type: "NotFound",
        success: false,
        message: "Invalid email",
      };
    }
    const data = await UserRepositories.createPasswordReset(email);

    return await this.mailtrapSend(email, data.token);
  }

  static async mailtrapSend(email: string, token: string) {
    try {
      await mailtrap.testing
        .send({
          from: { email: "mail@example.com" },
          to: [{ email: email }],
          subject: "Reset Password",
          text: `Berikut link untuk reset password anda: ${token}`,
          category: "Integration Test",
        })
        .then(console.log, console.error);
    } catch (error) {
      console.log(error, "<--- mailtrapError");
    }
  }
}

export default UserService;
