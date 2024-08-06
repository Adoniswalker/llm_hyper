import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import conversationRoutes from "./routes/conversationRoutes";
import { myDataSource } from "./helpers/app-data-source";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();
app.use(bodyParser.json());

app.use("/conversations", conversationRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
