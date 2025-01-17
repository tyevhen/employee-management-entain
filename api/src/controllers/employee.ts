import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../db/client";

export const createEmployee = async (req: Request, res: Response) => {
  const { firstName, lastName, birthDate, phone, officeId, tags } = req.body;

  const data: Prisma.EmployeeCreateInput = {
    firstName,
    lastName,
    birthDate,
    phone,
    office: { connect: { id: officeId } },
    tags: {
      connectOrCreate: tags?.map((tag: string) => ({
        where: { name: tag },
        create: { name: tag },
      })),
    },
  };

  try {
    const newEmployee = await prisma.employee.create({ data });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Error creating employee" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, birthDate, phone, officeId, tags } = req.body;

  const data: Prisma.EmployeeUpdateInput = {
    firstName,
    lastName,
    birthDate,
    phone,
    office: officeId ? { connect: { id: officeId } } : undefined,
    tags: tags
      ? {
          connectOrCreate: tags.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        }
      : undefined,
  };

  try {
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Error updating employee" });
  }
};
