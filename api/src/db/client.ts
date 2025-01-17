import { PrismaClient } from "@prisma/client";
import config from "../config";

const prisma = new PrismaClient();

console.log("Prisma connected with DATABASE_URL:", config.dbUrl);

export default prisma;