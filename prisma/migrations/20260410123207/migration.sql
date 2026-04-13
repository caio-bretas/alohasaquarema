/*
  Warnings:

  - You are about to drop the column `telefone` on the `users` table. All the data in the column will be lost.
  - The `role` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Establishment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EstablishmentMetric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_tokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'PRODUCER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'PAUSED', 'SOLD_OUT', 'FINISHED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "EventCategory" AS ENUM ('PAGODE', 'SAMBA', 'FORRO', 'ELETRONICO', 'ROCK', 'AXE', 'SERTANEJO', 'FESTA', 'TEATRO', 'ESPORTE', 'OUTRO');

-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('ACTIVE', 'USED', 'CANCELLED', 'TRANSFERRED');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BOLETO');

-- CreateEnum
CREATE TYPE "BatchStatus" AS ENUM ('SCHEDULED', 'ACTIVE', 'PAUSED', 'SOLD_OUT', 'CLOSED');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'RESERVED', 'SOLD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('PERCENTAGE', 'FIXED');

-- CreateEnum
CREATE TYPE "CheckInMethod" AS ENUM ('QR_CODE', 'MANUAL');

-- DropForeignKey
ALTER TABLE "Establishment" DROP CONSTRAINT "Establishment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "EstablishmentMetric" DROP CONSTRAINT "EstablishmentMetric_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_establishmentId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "telefone",
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "cpf" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordHash" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "role",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'CUSTOMER';

-- DropTable
DROP TABLE "Establishment";

-- DropTable
DROP TABLE "EstablishmentMetric";

-- DropTable
DROP TABLE "Favorite";

-- DropTable
DROP TABLE "verification_tokens";

-- DropEnum
DROP TYPE "MetricType";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "producers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "cnpj" TEXT,
    "description" TEXT,
    "logoUrl" TEXT,
    "bannerUrl" TEXT,
    "instagram" TEXT,
    "website" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "producers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "producerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" "EventCategory" NOT NULL DEFAULT 'OUTRO',
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "venueName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL DEFAULT 'Saquarema',
    "state" TEXT NOT NULL DEFAULT 'RJ',
    "zipCode" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "doorsOpenAt" TIMESTAMP(3),
    "salesStartAt" TIMESTAMP(3),
    "salesEndAt" TIMESTAMP(3),
    "coverImageUrl" TEXT,
    "bannerImageUrl" TEXT,
    "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ageRating" INTEGER NOT NULL DEFAULT 18,
    "capacity" INTEGER NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "requiresCpf" BOOLEAN NOT NULL DEFAULT true,
    "allowTransfer" BOOLEAN NOT NULL DEFAULT true,
    "maxPerOrder" INTEGER NOT NULL DEFAULT 10,
    "absorveFee" BOOLEAN NOT NULL DEFAULT false,
    "platformFeePercent" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket_types" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "amenities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticket_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "batches" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "ticketTypeId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "BatchStatus" NOT NULL DEFAULT 'SCHEDULED',
    "price" DOUBLE PRECISION NOT NULL,
    "originalPrice" DOUBLE PRECISION,
    "totalQuantity" INTEGER NOT NULL,
    "soldQuantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQuantity" INTEGER NOT NULL DEFAULT 0,
    "startSaleAt" TIMESTAMP(3),
    "endSaleAt" TIMESTAMP(3),
    "minPerOrder" INTEGER NOT NULL DEFAULT 1,
    "maxPerOrder" INTEGER NOT NULL DEFAULT 10,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat_maps" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "mapData" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seat_maps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "seatMapId" TEXT NOT NULL,
    "ticketTypeId" TEXT NOT NULL,
    "row" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" "CouponType" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "minOrderValue" DOUBLE PRECISION,
    "maxDiscount" DOUBLE PRECISION,
    "totalLimit" INTEGER,
    "perUserLimit" INTEGER NOT NULL DEFAULT 1,
    "usedCount" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "couponId" TEXT,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "subtotal" DOUBLE PRECISION NOT NULL,
    "discountAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "platformFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "PaymentMethod",
    "paymentId" TEXT,
    "paymentData" JSONB,
    "paidAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "buyerName" TEXT NOT NULL,
    "buyerEmail" TEXT NOT NULL,
    "buyerCpf" TEXT,
    "buyerPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "batchId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DOUBLE PRECISION NOT NULL,
    "totalPrice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seatId" TEXT,
    "qrCode" TEXT NOT NULL,
    "status" "TicketStatus" NOT NULL DEFAULT 'ACTIVE',
    "eventTitle" TEXT NOT NULL,
    "ticketTypeName" TEXT NOT NULL,
    "batchName" TEXT NOT NULL,
    "pricePaid" DOUBLE PRECISION NOT NULL,
    "holderName" TEXT NOT NULL,
    "holderCpf" TEXT,
    "transferredAt" TIMESTAMP(3),
    "transferredFrom" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_ins" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "staffId" TEXT,
    "method" "CheckInMethod" NOT NULL DEFAULT 'QR_CODE',
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "producers_userId_key" ON "producers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "producers_cnpj_key" ON "producers"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_key" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_slug_idx" ON "events"("slug");

-- CreateIndex
CREATE INDEX "events_producerId_idx" ON "events"("producerId");

-- CreateIndex
CREATE INDEX "events_status_startDate_idx" ON "events"("status", "startDate");

-- CreateIndex
CREATE INDEX "batches_eventId_status_idx" ON "batches"("eventId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "seat_maps_eventId_key" ON "seat_maps"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "seats_seatMapId_row_number_key" ON "seats"("seatMapId", "row", "number");

-- CreateIndex
CREATE INDEX "coupons_code_idx" ON "coupons"("code");

-- CreateIndex
CREATE UNIQUE INDEX "coupons_eventId_code_key" ON "coupons"("eventId", "code");

-- CreateIndex
CREATE INDEX "orders_userId_idx" ON "orders"("userId");

-- CreateIndex
CREATE INDEX "orders_eventId_status_idx" ON "orders"("eventId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_seatId_key" ON "tickets"("seatId");

-- CreateIndex
CREATE UNIQUE INDEX "tickets_qrCode_key" ON "tickets"("qrCode");

-- CreateIndex
CREATE INDEX "tickets_qrCode_idx" ON "tickets"("qrCode");

-- CreateIndex
CREATE INDEX "tickets_userId_idx" ON "tickets"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "check_ins_ticketId_key" ON "check_ins"("ticketId");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "producers" ADD CONSTRAINT "producers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "producers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket_types" ADD CONSTRAINT "ticket_types_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "batches" ADD CONSTRAINT "batches_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat_maps" ADD CONSTRAINT "seat_maps_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_seatMapId_fkey" FOREIGN KEY ("seatMapId") REFERENCES "seat_maps"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticket_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seats"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_ins" ADD CONSTRAINT "check_ins_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
