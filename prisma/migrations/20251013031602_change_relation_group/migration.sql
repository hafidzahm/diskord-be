/*
  Warnings:

  - A unique constraint covering the columns `[RoomId]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Groups_RoomId_key" ON "Groups"("RoomId");
