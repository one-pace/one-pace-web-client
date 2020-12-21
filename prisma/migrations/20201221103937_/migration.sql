/*
  Warnings:

  - You are about to drop the column `episodeId` on the `Image` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_ibfk_3`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `episodeId`;
