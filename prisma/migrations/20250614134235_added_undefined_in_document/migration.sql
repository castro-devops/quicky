-- CreateEnum
CREATE TYPE "VendorStatus" AS ENUM ('active', 'suspended', 'pending');

-- CreateEnum
CREATE TYPE "VendorPlan" AS ENUM ('free', 'pro', 'enterprise');

-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "companyName" TEXT,
ADD COLUMN     "document" TEXT,
ADD COLUMN     "plan" "VendorPlan" NOT NULL DEFAULT 'free',
ADD COLUMN     "planExpiresAt" TIMESTAMP(3),
ADD COLUMN     "status" "VendorStatus" NOT NULL DEFAULT 'pending',
ALTER COLUMN "birth" DROP NOT NULL;
