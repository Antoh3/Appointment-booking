-- CreateTable
CREATE TABLE `AmbulanceRequest` (
    `id` VARCHAR(191) NOT NULL,
    `aidCarType` VARCHAR(191) NOT NULL,
    `selectedItems` JSON NOT NULL,

    UNIQUE INDEX `AmbulanceRequest_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
