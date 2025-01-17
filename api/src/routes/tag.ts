import express from "express";
import { createTag, deleteTag, findAll, updateTag } from "../controllers/tag";

const router = express.Router();

router.post("/", createTag);
router.put("/:id", updateTag);
router.get("/", findAll);
router.delete("/:id", deleteTag);

export { router as tagRouter };
