import { Request, Response } from "express";
import prisma from "../db/client";

export const findAll = async (_req: Request, res: Response) => {
  try {
    const offices = await prisma.office.findMany();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ error: "Error fetching offices" });
  }
};
