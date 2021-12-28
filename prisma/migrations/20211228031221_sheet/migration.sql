/*
  Warnings:

  - You are about to drop the column `wcaid` on the `account` table. All the data in the column will be lost.
  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `event` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_userId_fkey";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "wcaid",
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "event" DROP CONSTRAINT "event_pkey",
DROP COLUMN "userId",
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "event_pkey" PRIMARY KEY ("username", "eventName");

-- CreateTable
CREATE TABLE "sheet" (
    "wcaid" TEXT,
    "username" TEXT NOT NULL,

    CONSTRAINT "sheet_pkey" PRIMARY KEY ("username")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_username_key" ON "account"("username");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_username_fkey" FOREIGN KEY ("username") REFERENCES "sheet"("username") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sheet" ADD CONSTRAINT "sheet_username_fkey" FOREIGN KEY ("username") REFERENCES "account"("username") ON DELETE SET NULL ON UPDATE CASCADE;
