/*
  Warnings:

  - You are about to alter the column `permanentLocation` on the `Patient` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `AmbulanceRequest` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Patient` MODIFY `permanentLocation` JSON NOT NULL;
