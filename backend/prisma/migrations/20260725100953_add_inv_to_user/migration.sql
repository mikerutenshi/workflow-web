-- CreateTable
CREATE TABLE "InvToUser" (
    "invId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InvToUser_pkey" PRIMARY KEY ("invId","userId")
);

-- AddForeignKey
ALTER TABLE "InvToUser" ADD CONSTRAINT "InvToUser_invId_fkey" FOREIGN KEY ("invId") REFERENCES "Inventory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvToUser" ADD CONSTRAINT "InvToUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
