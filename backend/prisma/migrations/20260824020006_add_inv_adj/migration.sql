-- CreateEnum
CREATE TYPE "AdjReason" AS ENUM ('COUNT_CORRECTION', 'LOST', 'DAMAGED', 'FOUND', 'UNDOCUMENTED', 'INITIAL_STOCK');

-- AlterTable
ALTER TABLE "InvTx" ADD COLUMN     "adjId" INTEGER;

-- CreateTable
CREATE TABLE "InvAdj" (
    "id" SERIAL NOT NULL,
    "adjNo" TEXT NOT NULL,
    "invId" INTEGER NOT NULL,
    "adjDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "progress" "Progress" NOT NULL DEFAULT 'INITIATED',
    "note" TEXT,
    "createdBy" INTEGER NOT NULL,
    "updatedBy" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InvAdj_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvAdjItem" (
    "id" SERIAL NOT NULL,
    "invAdjId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "reason" "AdjReason" NOT NULL,
    "note" TEXT,

    CONSTRAINT "InvAdjItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvAdjItemToSize" (
    "invAdjItemId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "systemQty" INTEGER NOT NULL,
    "countedQty" INTEGER NOT NULL,

    CONSTRAINT "InvAdjItemToSize_pkey" PRIMARY KEY ("invAdjItemId","sizeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvAdj_adjNo_key" ON "InvAdj"("adjNo");

-- CreateIndex
CREATE INDEX "InvAdj_createdAt_idx" ON "InvAdj"("createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "InvAdjItem_invAdjId_productId_key" ON "InvAdjItem"("invAdjId", "productId");

-- AddForeignKey
ALTER TABLE "InvTx" ADD CONSTRAINT "InvTx_adjId_fkey" FOREIGN KEY ("adjId") REFERENCES "InvAdj"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvAdj" ADD CONSTRAINT "InvAdj_invId_fkey" FOREIGN KEY ("invId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvAdjItem" ADD CONSTRAINT "InvAdjItem_invAdjId_fkey" FOREIGN KEY ("invAdjId") REFERENCES "InvAdj"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvAdjItem" ADD CONSTRAINT "InvAdjItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvAdjItemToSize" ADD CONSTRAINT "InvAdjItemToSize_invAdjItemId_fkey" FOREIGN KEY ("invAdjItemId") REFERENCES "InvAdjItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvAdjItemToSize" ADD CONSTRAINT "InvAdjItemToSize_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
