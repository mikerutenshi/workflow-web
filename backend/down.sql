-- DropForeignKey
ALTER TABLE "public"."InvToUser" DROP CONSTRAINT "InvToUser_invId_fkey";

-- DropForeignKey
ALTER TABLE "public"."InvToUser" DROP CONSTRAINT "InvToUser_userId_fkey";

-- DropTable
DROP TABLE "public"."InvToUser";

