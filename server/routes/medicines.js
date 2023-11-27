import express from "express";
import {
  getMedicinesController,
  addMedicineController,
  addtoCartController,
  removeController,
  increaseQty,
  decreaseQty,
} from "../controllers/medicines.js";

import mid from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/getMedicines",getMedicinesController);
router.post("/add", mid, addMedicineController);
router.post("/remove", mid, removeController);
router.patch("/increseQty", mid, increaseQty);
router.patch("/decreaseQty", mid, decreaseQty);


router.post("/addtoCart", mid, addtoCartController);

export default router;
