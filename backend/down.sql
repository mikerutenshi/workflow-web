-- AlterTable
ALTER TABLE "public"."ColorToProduct" DROP CONSTRAINT "ColorToProduct_pkey",
ADD CONSTRAINT "ColorToProduct_pkey" PRIMARY KEY ("productId", "colorId");

