import { Router } from "express";
import { getUser } from "../controllers/userController.js";
import { requireAuth } from "@clerk/express";

const router = Router();

router.route("/getuser").get(requireAuth(), getUser);

export default router;
