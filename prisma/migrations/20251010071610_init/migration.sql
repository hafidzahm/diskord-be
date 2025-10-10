-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'USER', 'MEMBER', 'OWNER');

-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('FREE', 'PAID');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT', 'IMAGE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "Users" (
    "id" CHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "id" CHAR(36) NOT NULL,
    "role" "RoleType" NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Groups" (
    "id" CHAR(36) NOT NULL,
    "name" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "type" "GroupType" NOT NULL,
    "about" TEXT NOT NULL,
    "benefit" TEXT[],
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "RoomId" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupAssets" (
    "id" CHAR(36) NOT NULL,
    "filename" TEXT NOT NULL,
    "GroupId" TEXT NOT NULL,

    CONSTRAINT "GroupAssets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" CHAR(36) NOT NULL,
    "name" TEXT,
    "is_group" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "CreatorId" TEXT NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMembers" (
    "id" CHAR(36) NOT NULL,
    "joined_at" TIMESTAMP(3) NOT NULL,
    "RoomId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "RoleId" TEXT NOT NULL,

    CONSTRAINT "RoomMembers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomMesages" (
    "id" CHAR(36) NOT NULL,
    "content" TEXT NOT NULL,
    "type" "MessageType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "RoomId" TEXT NOT NULL,
    "SenderId" TEXT NOT NULL,

    CONSTRAINT "RoomMesages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResets" (
    "id" CHAR(36) NOT NULL,
    "token" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "PasswordResets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" CHAR(36) NOT NULL,
    "price" INTEGER NOT NULL,
    "type" "TransactionType" DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "OwnerId" TEXT NOT NULL,
    "UserId" TEXT NOT NULL,
    "GroupId" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payouts" (
    "id" CHAR(36) NOT NULL,
    "amount" INTEGER NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "bank_account_name" TEXT NOT NULL,
    "proof" TEXT,
    "status" "TransactionType" DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "UserId" TEXT NOT NULL,

    CONSTRAINT "Payouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roles_UserId_key" ON "Roles"("UserId");

-- AddForeignKey
ALTER TABLE "Roles" ADD CONSTRAINT "Roles_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupAssets" ADD CONSTRAINT "GroupAssets_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_CreatorId_fkey" FOREIGN KEY ("CreatorId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMembers" ADD CONSTRAINT "RoomMembers_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMesages" ADD CONSTRAINT "RoomMesages_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomMesages" ADD CONSTRAINT "RoomMesages_SenderId_fkey" FOREIGN KEY ("SenderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResets" ADD CONSTRAINT "PasswordResets_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_OwnerId_fkey" FOREIGN KEY ("OwnerId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_GroupId_fkey" FOREIGN KEY ("GroupId") REFERENCES "Groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payouts" ADD CONSTRAINT "Payouts_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
