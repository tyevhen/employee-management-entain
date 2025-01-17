import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../db/client";
import calculateTagUpdates from "../utils/prepareTagsUpdatePayload";

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

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: { tags: true },
    });

    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    const { tagsToDisconnect, tagsToConnectOrCreate } = calculateTagUpdates(
      employee.tags || [],
      tags || []
    );

    const data: Prisma.EmployeeUpdateInput = {
      firstName,
      lastName,
      birthDate,
      phone,
      office: officeId ? { connect: { id: officeId } } : undefined,
      tags: {
        disconnect: tagsToDisconnect,
        connectOrCreate: tagsToConnectOrCreate,
      },
    };

    const updatedEmployee = await prisma.employee.update({
      where: { id },
      include: { tags: true },
      data,
    });
    res.status(200).json(updatedEmployee);
  } catch (error) {    
    res.status(500).json({ error: "Error updating employee" });
  }
};

export const findAll = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees: " });
  }
};
