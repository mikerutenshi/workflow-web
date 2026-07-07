-- AlterTable
ALTER TABLE "public"."InvToProduct" DROP COLUMN "discounts",
ADD COLUMN     "discount" DECIMAL(5,4);

-- AlterTable
ALTER TABLE "public"."InvTrfItem" DROP COLUMN "discounts",
ADD COLUMN     "discount" DECIMAL(5,4);

