/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[code]` on the table `Language`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[name]` on the table `Language`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Language.code_unique` ON `Language`(`code`);

-- CreateIndex
CREATE UNIQUE INDEX `Language.name_unique` ON `Language`(`name`);
