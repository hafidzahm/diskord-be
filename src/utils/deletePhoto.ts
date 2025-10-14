import fs from "fs";
export default function deletePhoto(path: string[] | string) {
  console.log(path, "<--pathInsideDeletePhoto");
  console.log(typeof path, "<--pathInsideDeletePhoto");

  if (typeof path === "string") {
    //photo
    if (path !== undefined) {
      console.log(`-- PATH DETECTED: ${path} --`);

      fs.unlinkSync(path as string);
      return;
    } else {
      console.log("-- PATH NOT DETECTED --");
      return;
    }
  }

  if (typeof path === "object") {
    //assets
    const paths = path as string[];
    if (paths.length > 0) {
      for (const path of paths) {
        console.log(path, "<-----pathAsset");

        fs.unlinkSync(path as string);
      }
    }
    return;
  }
}
