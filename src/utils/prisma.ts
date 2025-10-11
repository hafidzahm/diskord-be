import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient().$extends({
  result: {
    user: {
      //objek foto belum tersedia saat bikin api signup
      photo_url: {
        needs: {
          photo: true,
        },
        compute(data) {
          if (data.photo) {
            return `${process.env.DEFAULT_PHOTO_URL}/${data.photo}`;
          }
          return null;
        },
      },
    },
  },
});

export default prisma;
