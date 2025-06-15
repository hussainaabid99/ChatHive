import express from "express";
import { PORT } from "./config/serverConfig.js";
import dbConnect from "./config/dbConfig.js";
import apiRoutes from "./routes/apiRoutes.js";
import bullServerAdapter from "./config/bullBoardConfig.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/ui", bullServerAdapter.getRouter());

app.use("/api", apiRoutes);

io.on("connection", (socket) => {
  console.log("connected to socket:", socket.id);
  setTimeout(() => {
    socket.emit("new message", "Hello from the server");
  }, 2000);
  socket.on("listen", (msg) => {
    console.log(msg);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
  dbConnect();
});
