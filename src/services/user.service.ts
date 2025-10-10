import "multer"; // This loads the global types
import type { SignUpSchemaType } from "../utils/schema/user.schema.js";

class UserService {
  static signUp(data: SignUpSchemaType, file: Express.Multer.File) {}
}

export default UserService;
