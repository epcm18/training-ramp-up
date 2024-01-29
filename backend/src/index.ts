// src/index.js
import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { DataSource } from "typeorm";

import socketRouter from "./routes/studentRoute";

import dotenv from "dotenv";
import { Student } from "./models/Student";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

dotenv.config();

const app: express.Application = express();
app.use(cors());
const port = process.env.PORT || 8000;
const server = http.createServer(app);

// const io = new Server(server);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
});

export const AppDataSource = new DataSource({
  type: "postgres",
  // host: process.env.LOCALHOST,
  // port: 5432,
  // username: process.env.DB_USERNAME,
  // password: process.env.PASSWORD,
  // database: process.env.DATABASE,
  synchronize: true,
  host: process.env.DEPLOYED_HOST,
  port: 5432,
  username: process.env.DEPLOYED_USERNAME,
  password: process.env.DEPLOYED_PASSWORD,
  database: process.env.DEPLOYED_DB,

  logging: true,
  entities: [Student],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");
    // app.listen(port, () => {
    //   console.log(`Server running on port ${port}`);
    // });
    server.listen(5000, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to the database", err);
  });

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/student", socketRouter(io));

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

// app.use((err: any, req: Request, res: Response) => {
//   const errorStatus = err.status || 500;
//   const errorMessage = err.message || "something went wrong!";
//   return res.status(errorStatus).json({
//       success: false,
//       status: errorStatus,
//       message: errorMessage,
//       stack: err.stack,
//   });
// });
