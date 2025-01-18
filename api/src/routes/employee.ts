import express from "express";
import { validateEmployee } from "../middleware/validateEmployee";
import { validatePaginationAndSorting } from "../middleware/validatePaginationAndSorting";
import {
  createEmployee,
  updateEmployee,
  getAllWithPaginationAndSorting,
} from "../controllers/employee";

const router = express.Router();

router.post("/", validateEmployee, createEmployee);
router.put("/:id", validateEmployee, updateEmployee);
router.get("/", validatePaginationAndSorting, getAllWithPaginationAndSorting);

export { router as employeeRouter };
