-- CreateTable
CREATE TABLE `ArcTranslation` (
    `id` VARCHAR(191) NOT NULL,
    `arc_id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `language_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EpisodeTranslation` (
    `id` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191),
    `episode_id` VARCHAR(191) NOT NULL,
    `language_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nameNative` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ArcTranslation` ADD FOREIGN KEY (`arc_id`) REFERENCES `Arc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArcTranslation` ADD FOREIGN KEY (`language_id`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EpisodeTranslation` ADD FOREIGN KEY (`episode_id`) REFERENCES `Episode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EpisodeTranslation` ADD FOREIGN KEY (`language_id`) REFERENCES `Language`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
