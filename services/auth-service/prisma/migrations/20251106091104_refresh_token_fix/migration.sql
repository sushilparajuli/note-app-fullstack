/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `refresh_token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "refresh_token_token_key" ON "refresh_token"("token");
