-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_laborCostId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_laborCostId_fkey" FOREIGN KEY ("laborCostId") REFERENCES "LaborCost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
