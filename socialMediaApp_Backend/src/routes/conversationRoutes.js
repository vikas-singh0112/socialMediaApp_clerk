import { Router } from "express";
import { createConversation, deleteConversation, getConversation } from "../controllers/conversationController.js";


const router = Router()

router.route("/createConversation").get(createConversation)
router.route("/getConversation/:userId").get(getConversation)
router.route("/deleteConversation").put(deleteConversation)

export default router