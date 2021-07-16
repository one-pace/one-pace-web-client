/*
  Warnings:

  - Added the required column `updated_at` to the `ArcTranslation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `EpisodeTranslation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ArcTranslation` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(1000);

-- AlterTable
ALTER TABLE `EpisodeTranslation` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `description` VARCHAR(1000);
