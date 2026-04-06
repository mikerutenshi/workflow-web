/*
  Warnings:

  - You are about to drop the column `sellingPrice` on the `InvToProduct` table. All the data in the column will be lost.
  - You are about to drop the column `workId` on the `InvTrfItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[trfNo]` on the table `InvTrf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[workId]` on the table `InvTrf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "TxType" AS ENUM ('SALE', 'TRANSFER_IN', 'TRANSFER_OUT', 'PRODUCTION', 'ADJUSTMENT', 'REVERSION');

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_workId_fkey";

-- DropIndex
DROP INDEX "InvTrfItem_workId_key";

-- AlterTable
ALTER TABLE "InvToProduct" DROP COLUMN "sellingPrice",
ALTER COLUMN "discount" DROP NOT NULL,
ALTER COLUMN "discount" DROP DEFAULT,
ALTER COLUMN "discount" SET DATA TYPE DECIMAL(5,4);

-- AlterTable
ALTER TABLE "InvTrf" ADD COLUMN     "workId" INTEGER;

-- AlterTable
ALTER TABLE "InvTrfItem" DROP COLUMN "workId",
ADD COLUMN     "discount" DECIMAL(5,4);

-- AlterTable
ALTER TABLE "ProductGroup" ADD COLUMN     "msrp" INTEGER;

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "note" TEXT;

-- CreateTable
CREATE TABLE "InvTx" (
    "id" SERIAL NOT NULL,
    "txNo" TEXT NOT NULL,
    "invId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "type" "TxType" NOT NULL,
    "saleId" INTEGER,
    "trfId" INTEGER,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvTx_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvTxToSize" (
    "invTxId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "InvTxToSize_pkey" PRIMARY KEY ("invTxId","sizeId")
);

-- CreateTable
CREATE TABLE "PriceFormula" (
    "id" SERIAL NOT NULL,
    "multiplier" DECIMAL(3,2),
    "offset" INTEGER,
    "discounts" DECIMAL(5,4)[],
    "invId" INTEGER NOT NULL,

    CONSTRAINT "PriceFormula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "saleNo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleItem" (
    "id" SERIAL NOT NULL,
    "saleId" INTEGER NOT NULL,
    "invId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleItemToSize" (
    "saleItemId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "SaleItemToSize_pkey" PRIMARY KEY ("saleItemId","sizeId")
);

-- CreateIndex
CREATE INDEX "InvTx_createdAt_idx" ON "InvTx"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "PriceFormula_invId_key" ON "PriceFormula"("invId");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_saleNo_key" ON "Sale"("saleNo");

-- CreateIndex
CREATE INDEX "Sale_createdAt_idx" ON "Sale"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "InvTrf_trfNo_key" ON "InvTrf"("trfNo");

-- CreateIndex
CREATE UNIQUE INDEX "InvTrf_workId_key" ON "InvTrf"("workId");

-- CreateIndex
CREATE INDEX "InvTrf_createdAt_idx" ON "InvTrf"("createdAt" DESC);

-- AddForeignKey
ALTER TABLE "InvTrf" ADD CONSTRAINT "InvTrf_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTx" ADD CONSTRAINT "InvTx_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTx" ADD CONSTRAINT "InvTx_trfId_fkey" FOREIGN KEY ("trfId") REFERENCES "InvTrf"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTxToSize" ADD CONSTRAINT "InvTxToSize_invTxId_fkey" FOREIGN KEY ("invTxId") REFERENCES "InvTx"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTxToSize" ADD CONSTRAINT "InvTxToSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PriceFormula" ADD CONSTRAINT "PriceFormula_invId_fkey" FOREIGN KEY ("invId") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_productId_invId_fkey" FOREIGN KEY ("productId", "invId") REFERENCES "InvToProduct"("productId", "invId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItemToSize" ADD CONSTRAINT "SaleItemToSize_saleItemId_fkey" FOREIGN KEY ("saleItemId") REFERENCES "SaleItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItemToSize" ADD CONSTRAINT "SaleItemToSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
