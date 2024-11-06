/*
  Warnings:

  - Made the column `userId` on table `Doctor` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_userId_fkey`;

-- AlterTable
ALTER TABLE `Doctor` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
