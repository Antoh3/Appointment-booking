/*
  Warnings:

  - You are about to drop the column `primaryPhysician` on the `Appointment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Feedback` DROP FOREIGN KEY `Feedback_userId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `primaryPhysician`;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Patient`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
