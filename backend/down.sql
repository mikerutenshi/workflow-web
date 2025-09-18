-- DropForeignKey
ALTER TABLE "InvToProduct" DROP CONSTRAINT "InvToProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "InvToProduct" DROP CONSTRAINT "InvToProduct_invId_fkey";

-- DropForeignKey
ALTER TABLE "InvProductToSize" DROP CONSTRAINT "InvProductToSize_invProductId_fkey";

-- DropForeignKey
ALTER TABLE "InvProductToSize" DROP CONSTRAINT "InvProductToSize_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "InvTransfer" DROP CONSTRAINT "InvTransfer_fromInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTransfer" DROP CONSTRAINT "InvTransfer_toInvId_fkey";

-- DropForeignKey
ALTER TABLE "InvTransfer" DROP CONSTRAINT "InvTransfer_invProductId_fkey";

-- DropForeignKey
ALTER TABLE "InvTransferToSize" DROP CONSTRAINT "InvTransferToSize_invTransferId_fkey";

-- DropForeignKey
ALTER TABLE "InvTransferToSize" DROP CONSTRAINT "InvTransferToSize_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "SalesTx" DROP CONSTRAINT "SalesTx_invId_fkey";

-- DropForeignKey
ALTER TABLE "ProductToSalesTx" DROP CONSTRAINT "ProductToSalesTx_salesTxId_fkey";

-- DropForeignKey
ALTER TABLE "ProductToSalesTx" DROP CONSTRAINT "ProductToSalesTx_productId_fkey";

-- DropForeignKey
ALTER TABLE "SalesTxProductToSize" DROP CONSTRAINT "SalesTxProductToSize_salesTxProductId_fkey";

-- DropForeignKey
ALTER TABLE "SalesTxProductToSize" DROP CONSTRAINT "SalesTxProductToSize_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_salesmanId_fkey";

-- DropForeignKey
ALTER TABLE "Salesman" DROP CONSTRAINT "Salesman_invId_fkey";

-- DropTable
DROP TABLE "Inventory";

-- DropTable
DROP TABLE "InvToProduct";

-- DropTable
DROP TABLE "InvProductToSize";

-- DropTable
DROP TABLE "InvTransfer";

-- DropTable
DROP TABLE "InvTransferToSize";

-- DropTable
DROP TABLE "SalesTx";

-- DropTable
DROP TABLE "ProductToSalesTx";

-- DropTable
DROP TABLE "SalesTxProductToSize";

-- DropTable
DROP TABLE "Client";

-- DropTable
DROP TABLE "Salesman";

-- DropEnum
DROP TYPE "TxStatus";

