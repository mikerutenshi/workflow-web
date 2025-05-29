/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,gender]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[skuNumeric]` on the table `ProductGroup` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_gender_key" ON "ProductCategory"("name", "gender");

-- CreateIndex
CREATE UNIQUE INDEX "ProductGroup_skuNumeric_key" ON "ProductGroup"("skuNumeric");
