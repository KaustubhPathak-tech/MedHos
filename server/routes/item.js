import express from "express";
import { upload } from "../middlewares/multer.js";

import { addItem } from "../controllers/upload.js";
const router = express.Router();
router.route("/").post(upload.single("file"), addItem);
export default router;
