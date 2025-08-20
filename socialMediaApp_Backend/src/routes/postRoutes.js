import { Router } from "express";
import { requireAuth } from "@clerk/express";
import { createPost } from "../controllers/postController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/createpost").post(
  requireAuth(),
  upload.fields([
    {
      name: "postImage",
      maxCount: 1,
    },
  ]),
  createPost
);

export default router;
