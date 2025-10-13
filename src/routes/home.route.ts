import express, { type Request, type Response } from "express";
const homeRoute = express.Router();

homeRoute.get("/", (req: Request, res: Response) => {
  res.send({
    message: "Welcome to Diskord-BE!",
  });
});

export default homeRoute;
