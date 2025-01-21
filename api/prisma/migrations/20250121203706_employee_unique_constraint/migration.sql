/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName,birthDate]` on the table `employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "employee_firstName_lastName_birthDate_key" ON "employee"("firstName", "lastName", "birthDate");
