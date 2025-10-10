import { PrismaClient, RoleType } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  const roles: RoleType[] = ["ADMIN", "USER", "MEMBER", "OWNER"];
  for (const role of roles) {
    const isRoleExist = await prisma.role.findFirst({
      where: {
        role: role,
      },
    });

    await prisma.role.upsert({
      where: {
        id: isRoleExist?.id ?? "",
      },
      create: {
        role,
      },
      update: {},
    });
  }
}

async function main() {
  try {
    await seed();
    await prisma.$disconnect();
    console.log("Role seeding is completed!");
  } catch (error) {
    console.log(error, "PrismaSeedingRoleError");
    prisma.$disconnect();
    process.exit(1);
  }
}

main();
