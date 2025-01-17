import express from "express";
import { findAll } from "../controllers/office";

const router = express.Router();

router.get("/", findAll);

export { router as officeRouter };
