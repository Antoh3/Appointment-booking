-- DropForeignKey
ALTER TABLE `Doctor` DROP FOREIGN KEY `Doctor_userId_fkey`;

-- AlterTable
ALTER TABLE `Doctor` MODIFY `userId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Doctor` ADD CONSTRAINT `Doctor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
