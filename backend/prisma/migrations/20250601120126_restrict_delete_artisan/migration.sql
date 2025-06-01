-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_artisanId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_artisanId_fkey" FOREIGN KEY ("artisanId") REFERENCES "Artisan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
