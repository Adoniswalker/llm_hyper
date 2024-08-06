import { Request, Response } from "express";
import { Conversation } from "../entities/conversation.entity";
import axios, { AxiosError } from "axios";
import { myDataSource } from "../helpers/app-data-source";

const selectModelAndQuery = async (req: Request, res: Response) => {
  const { model, question, session_id } = req.body;
  try {
    const response = await axios.post(
      `http://${process.env.LLM_HOST}:${5000}/query`,
      {
        model: model,
        question: question,
        session_id: session_id,
      }
    );

    const conversationRepository = myDataSource.getRepository(Conversation);
    await conversationRepository.save({
      sessionId: session_id,
      role: "user",
      content: question,
    });
    await conversationRepository.save({
      sessionId: session_id,
      role: "model",
      content: response.data.response,
    });
    res.json(response.data);
  } catch (e: any) {
    console.log(typeof e);
    if (typeof e === "string") {
      console.error(e); // works, `e` narrowed to string
    } else if (axios.isAxiosError(e)) {
      res.status(400).json(e.response?.data);
    } else if (e instanceof Error) {
      console.error(e.message); // works, `e` narrowed to Error
    }
    console.error("Error in selectModelAndQuery", e.message);
    res.status(500).json({ error: "Failed to send query" });
  }
};

const listConversations = async (req: Request, res: Response) => {
  try {
    const conversationRepository = myDataSource.getRepository(Conversation);
    const result = await conversationRepository.find({
      order: {
        createdAt: "DESC",
      },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to list conversations" });
  }
};

const getConversationDetails = async (req: Request, res: Response) => {
  const { session_id } = req.params;
  try {
    const conversationRepository = myDataSource.getRepository(Conversation);
    const result = await conversationRepository.find({
      where: { sessionId: session_id },
      order: { createdAt: "DESC" },
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to get conversation details" });
  }
};

export { selectModelAndQuery, listConversations, getConversationDetails };
