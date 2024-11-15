/*
  Warnings:

  - You are about to drop the column `certificate` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `idBack` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `idFront` on the `Patient` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Doctor` ADD COLUMN `certificate` VARCHAR(191) NULL,
    ADD COLUMN `idBack` VARCHAR(191) NULL,
    ADD COLUMN `idFront` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Patient` DROP COLUMN `certificate`,
    DROP COLUMN `idBack`,
    DROP COLUMN `idFront`;
