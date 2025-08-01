import express from "express";
import cors from "cors";
import { PORT } from "./config/serverConfig.js";
import dbConnect from "./config/dbConfig.js";
import apiRoutes from "./routes/apiRoutes.js";
import bullServerAdapter from "./config/bullBoardConfig.js";
import { createServer } from "http";
import { Server } from "socket.io";
import messageHandlers from "./controller/messageSocketController.js";
import messageSocketHandlers from "./controller/channelSocketController.js";
import { verifyEmailController } from "./controller/userController.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ui", bullServerAdapter.getRouter());

app.use("/api", apiRoutes);

app.get("/verify/:token", verifyEmailController);

io.on("connection", (socket) => {
  messageHandlers(io, socket);
  messageSocketHandlers(io, socket);
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  dbConnect();
});
