import fs from "fs";
export default function deletePhoto(path: string) {
  fs.unlinkSync(path);
}
