/*
  Warnings:

  - You are about to drop the column `eventId` on the `batches` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "batches" DROP CONSTRAINT "batches_eventId_fkey";

-- DropIndex
DROP INDEX "batches_eventId_status_idx";

-- AlterTable
ALTER TABLE "batches" DROP COLUMN "eventId";
