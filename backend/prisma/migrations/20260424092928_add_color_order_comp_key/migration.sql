/*
  Warnings:

  - The primary key for the `ColorToProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ColorToProduct" DROP CONSTRAINT "ColorToProduct_pkey",
ADD CONSTRAINT "ColorToProduct_pkey" PRIMARY KEY ("productId", "colorId", "order");
