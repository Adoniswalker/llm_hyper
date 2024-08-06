import { Router } from "express";
import {
  selectModelAndQuery,
  listConversations,
  getConversationDetails,
} from "../controllers/conversationController";

const router = Router();

router.post("/query", selectModelAndQuery);
router.get("/", listConversations);
router.get("/:session_id", getConversationDetails);

export default router;
