-- CreateTable
CREATE TABLE `Arc` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `manga_chapters` VARCHAR(191) NOT NULL,
    `anime_episodes` VARCHAR(191) NOT NULL,
    `torrent_hash` VARCHAR(191) NOT NULL,
    `resolution` VARCHAR(191) NOT NULL,
    `is_completed` BOOLEAN NOT NULL,
    `is_hidden` BOOLEAN NOT NULL,
    `is_released` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
UNIQUE INDEX `Arc.title_unique`(`title`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Episode` (
    `id` VARCHAR(191) NOT NULL,
    `arc_id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(1000) NOT NULL,
    `part` INT NOT NULL,
    `manga_chapters` VARCHAR(191) NOT NULL,
    `anime_episodes` VARCHAR(191) NOT NULL,
    `crc32` VARCHAR(191) NOT NULL,
    `torrent_hash` VARCHAR(191) NOT NULL,
    `streams_hash` VARCHAR(191),
    `resolution` VARCHAR(191) NOT NULL,
    `released_date` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `openload` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
UNIQUE INDEX `Episode.title_unique`(`title`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `arc_id` VARCHAR(191),
    `alt` VARCHAR(191),
    `episode_id` VARCHAR(191),
    `src` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `width` INT NOT NULL,
    `episodeId` VARCHAR(191),
UNIQUE INDEX `Image.src_unique`(`src`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
UNIQUE INDEX `User.email_unique`(`email`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191),
    `name` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191),
    `picture` VARCHAR(191),
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
UNIQUE INDEX `UserProfile_user_id_unique`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Episode` ADD FOREIGN KEY (`arc_id`) REFERENCES `Arc`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD FOREIGN KEY (`arc_id`) REFERENCES `Arc`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD FOREIGN KEY (`episode_id`) REFERENCES `Episode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD FOREIGN KEY (`episodeId`) REFERENCES `Episode`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
