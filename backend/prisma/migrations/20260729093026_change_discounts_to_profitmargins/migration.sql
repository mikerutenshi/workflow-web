/*
  Warnings:

  - You are about to drop the column `discounts` on the `PriceFormula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PriceFormula" DROP COLUMN "discounts",
ADD COLUMN     "profitMargins" DECIMAL(5,4)[];
