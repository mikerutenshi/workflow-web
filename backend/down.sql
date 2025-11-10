-- DropForeignKey
ALTER TABLE "LaborCost" DROP CONSTRAINT "LaborCost_productGroupId_fkey";

-- DropForeignKey
ALTER TABLE "InvToProduct" DROP CONSTRAINT "InvToProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvToProduct" DROP CONSTRAINT "InvToProduct_invId_fkey";

-- DropForeignKey
ALTER TABLE "InvProductToSize" DROP CONSTRAINT "InvProductToSize_invId_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvProductToSize" DROP CONSTRAINT "InvProductToSize_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_invTrfId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_fromInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_toInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_fromInvId_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItem" DROP CONSTRAINT "InvTrfItem_workId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrf" DROP CONSTRAINT "InvTrf_fromInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrf" DROP CONSTRAINT "InvTrf_toInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItemToSize" DROP CONSTRAINT "InvTrfItemToSize_invTrfItemId_fkey";

-- DropForeignKey
ALTER TABLE "InvTrfItemToSize" DROP CONSTRAINT "InvTrfItemToSize_sizeId_fkey";

-- AlterTable
ALTER TABLE "Work" DROP COLUMN "progress";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "InvToProduct";

-- DropTable
DROP TABLE "InvProductToSize";

-- DropTable
DROP TABLE "InvTrfItem";

-- DropTable
DROP TABLE "InvTrf";

-- DropTable
DROP TABLE "InvTrfItemToSize";

-- DropEnum
DROP TYPE "Progress";

-- DropEnum
DROP TYPE "InvType";

-- AddForeignKey
ALTER TABLE "LaborCost" ADD CONSTRAINT "LaborCost_productGroupId_fkey" FOREIGN KEY ("productGroupId") REFERENCES "ProductGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

