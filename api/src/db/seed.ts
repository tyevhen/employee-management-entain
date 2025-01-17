import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const runSeed = async () => {
  console.log("Seeding database...");

  const existingOffices = await prisma.office.findMany();
  if (existingOffices.length > 0) {
    console.log("Offices already seeded, skipping...");
    return;
  }

  await prisma.office.createMany({
    data: [{ name: "Tallinn" }, { name: "Riga" }, { name: "Vilnius" }],
  });

  console.log("Database seeded successfully!");
};

export default runSeed;