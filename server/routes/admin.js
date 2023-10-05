import express from "express"
import {getAllUsersController,getAllDoctorsController,changeAccountStatusController} from "../controllers/admin.js"
import mid from "../middlewares/authMiddleware.js"

const router=express.Router();

router.get("/getAllUsers", mid, getAllUsersController);

//GET METHOD || DOCTORS
router.get("/getAllDoctors", mid, getAllDoctorsController);

//POST ACCOUNT STATUS
router.post(
  "/changeAccountStatus",
  mid,
  changeAccountStatusController
);

export default router