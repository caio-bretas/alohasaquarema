-- AlterTable
ALTER TABLE "seats" ADD COLUMN     "capacity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "reservedByOrderId" TEXT,
ADD COLUMN     "reservedUntil" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "seats_ticketTypeId_status_idx" ON "seats"("ticketTypeId", "status");

-- CreateIndex
CREATE INDEX "seats_reservedUntil_idx" ON "seats"("reservedUntil");

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_reservedByOrderId_fkey" FOREIGN KEY ("reservedByOrderId") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
