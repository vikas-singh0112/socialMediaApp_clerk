import express from "express";
import dotenv from "dotenv";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.static("public"));

app.use(
  express.json({
    limit: "16kb",
  })
);
app.use(
  express.urlencoded({
    limit: "16kb",
  })
);

//routes import
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js"
import conversationRouter from "./routes/conversationRoutes.js";

// routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/conversation", conversationRouter);

export { app };
