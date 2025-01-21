import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import prisma from "../db/client";

export const createTag = async (req: Request, res: Response) => {
  const { name } = req.body;  
  const data: Prisma.TagCreateInput = {
    name,
  };

  try {
    const newTag = await prisma.tag.create({ data });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Error creating tag" });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const data: Prisma.TagUpdateInput = {
    name,
  };

  try {
    const updatedTag = await prisma.tag.update({ where: { id }, data });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json({ error: "Error updating tag" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeesWithTag = await prisma.employee.findMany({
      where: {
        tags: {
          some: { id },
        },
      },
    });

    await prisma.$transaction([
      ...employeesWithTag.map((employee) =>
        prisma.employee.update({
          where: { id: employee.id },
          data: {
            tags: {
              disconnect: { id },
            },
          },
        })
      ),

      prisma.tag.delete({
        where: { id },
      }),
    ]);

    res.status(200).json({ message: "Tag deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting tag" });
  }
};

export const findAll = async (_req: Request, res: Response) => {
  try {
    const tags = await prisma.tag.findMany();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "Error fetching tags" });
  }
};

