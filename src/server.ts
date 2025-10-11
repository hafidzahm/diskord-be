const express = require("express");
import type { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.js";
const app = express();
const port = 3000;

app.use(express.static("public")); //public static folder
app.use(cors()); //cors
app.use(bodyParser.json()); //bodyparser for json

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`🚀 Diskord meluncur di port: ${port} 🚀`);
});
