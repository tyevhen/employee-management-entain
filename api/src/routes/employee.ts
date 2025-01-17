import express from "express";
import { validateEmployee } from "../middleware/validateEmployee";
import { createEmployee } from "../controllers/employee";

const employeeRouter = express.Router();

employeeRouter.post('/', validateEmployee, createEmployee);

export default employeeRouter;