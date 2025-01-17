import express from "express";
import { validateEmployee } from "../middleware/validateEmployee";
import {
  createEmployee,
  updateEmployee,
  findAll,
} from "../controllers/employee";

const router = express.Router();

router.post("/", validateEmployee, createEmployee);
router.put("/:id", validateEmployee, updateEmployee);
router.get("/", findAll);

export { router as employeeRouter };
