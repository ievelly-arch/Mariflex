/*
  Warnings:

  - Added the required column `senha` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `senha` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `funcionario` ADD COLUMN `senha` VARCHAR(255) NOT NULL;
