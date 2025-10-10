import type { RoleType } from "../generated/prisma/index.js";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seed() {
  const roles: RoleType[] = ["ADMIN", "MEMBER", "OWNER", "USER"];
  for (const role of roles) {
    const isRoleExist = await prisma.role.findFirst({
      where: {
        role: role,
      },
    });

    await prisma.upsert({
      where: {
        id: isRoleExist.id ?? "",
      },
      create: {
        role: role,
      },
      update: {},
    });
  }

  console.log("Role seeding is completed!");
}

async function main() {
  try {
    await seed();
    await prisma.$disconnect();
  } catch (error) {
    console.log(error, "PrismaSeedingRoleError");
    prisma.$disconnect();
    process.exit(1);
  }
}
