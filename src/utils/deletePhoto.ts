import fs from "fs";
export default function deletePhoto(path: string) {
  if (path !== undefined) {
    console.log(`-- PATH DETECTED: ${path} --`);

    fs.unlinkSync(path);
  } else {
    console.log("-- PATH NOT DETECTED --");
  }
}
