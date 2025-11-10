-- CreateEnum
CREATE TYPE "Progress" AS ENUM ('INITIATED', 'PENDING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELED', 'FAILED');

-- CreateEnum
CREATE TYPE "InvType" AS ENUM ('FACTORY', 'STORAGE', 'CONSIGNMENT', 'STOREFRONT');

-- DropForeignKey
ALTER TABLE "LaborCost" DROP CONSTRAINT "LaborCost_productGroupId_fkey";

-- AlterTable
ALTER TABLE "Work" ADD COLUMN     "progress" "Progress" NOT NULL DEFAULT 'INITIATED';

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "type" "InvType" NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvToProduct" (
    "invId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "sellingPrice" INTEGER NOT NULL DEFAULT 0,
    "discount" DECIMAL(3,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "InvToProduct_pkey" PRIMARY KEY ("invId","productId")
);

-- CreateTable
CREATE TABLE "InvProductToSize" (
    "invId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "InvProductToSize_pkey" PRIMARY KEY ("invId","productId","sizeId")
);

-- CreateTable
CREATE TABLE "InvTrfItem" (
    "id" SERIAL NOT NULL,
    "invTrfId" INTEGER,
    "fromInvId" INTEGER,
    "toInvId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "progress" "Progress" NOT NULL DEFAULT 'PENDING',
    "workId" INTEGER,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvTrfItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvTrf" (
    "id" SERIAL NOT NULL,
    "trfNo" TEXT NOT NULL,
    "fromInvId" INTEGER,
    "toInvId" INTEGER NOT NULL,
    "trfDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" "Progress" NOT NULL DEFAULT 'PENDING',
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvTrf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvTrfItemToSize" (
    "invTrfItemId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "InvTrfItemToSize_pkey" PRIMARY KEY ("invTrfItemId","sizeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_name_key" ON "Inventory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "InvTrfItem_workId_key" ON "InvTrfItem"("workId");

-- AddForeignKey
ALTER TABLE "LaborCost" ADD CONSTRAINT "LaborCost_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "ProductGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvToProduct" ADD CONSTRAINT "InvToProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvToProduct" ADD CONSTRAINT "InvToProduct_invId_fkey" FOREIGN KEY ("invId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvProductToSize" ADD CONSTRAINT "InvProductToSize_invId_productId_fkey" FOREIGN KEY ("invId", "productId") REFERENCES "InvToProduct"("invId", "productId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvProductToSize" ADD CONSTRAINT "InvProductToSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_invTrfId_fkey" FOREIGN KEY ("invTrfId") REFERENCES "InvTrf"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_fromInvId_fkey" FOREIGN KEY ("fromInvId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_toInvId_fkey" FOREIGN KEY ("toInvId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_fromInvId_productId_fkey" FOREIGN KEY ("fromInvId", "productId") REFERENCES "InvToProduct"("invId", "productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItem" ADD CONSTRAINT "InvTrfItem_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrf" ADD CONSTRAINT "InvTrf_fromInvId_fkey" FOREIGN KEY ("fromInvId") REFERENCES "Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrf" ADD CONSTRAINT "InvTrf_toInvId_fkey" FOREIGN KEY ("toInvId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItemToSize" ADD CONSTRAINT "InvTrfItemToSize_invTrfItemId_fkey" FOREIGN KEY ("invTrfItemId") REFERENCES "InvTrfItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvTrfItemToSize" ADD CONSTRAINT "InvTrfItemToSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
