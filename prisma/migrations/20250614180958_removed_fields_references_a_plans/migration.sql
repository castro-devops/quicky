/*
  Warnings:

  - You are about to drop the column `companyName` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `vendors` table. All the data in the column will be lost.
  - You are about to drop the column `planExpiresAt` on the `vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vendors" DROP COLUMN "companyName",
DROP COLUMN "plan",
DROP COLUMN "planExpiresAt";

-- DropEnum
DROP TYPE "VendorPlan";
