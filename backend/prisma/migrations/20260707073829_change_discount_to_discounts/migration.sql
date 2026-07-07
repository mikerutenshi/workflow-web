/*
  Warnings:

  - You are about to drop the column `discount` on the `InvToProduct` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `InvTrfItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InvToProduct" DROP COLUMN "discount",
ADD COLUMN     "discounts" DECIMAL(5,4)[];

-- AlterTable
ALTER TABLE "InvTrfItem" DROP COLUMN "discount",
ADD COLUMN     "discounts" DECIMAL(5,4)[];
