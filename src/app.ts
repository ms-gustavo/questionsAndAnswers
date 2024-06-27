import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import questionRoutes from "../routes/questionRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", questionRoutes);
app.use((req: Request, res: Response) => {
  res.status(404).render("404");
});

export default app;
