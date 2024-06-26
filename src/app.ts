import express from "express";
import bodyParser from "body-parser";
import connection from "../database/database";
import dotenv from "dotenv";
import questionRoutes from "../routes/questionRoutes";
import Question from "../database/Question";
dotenv.config();

const PORT = process.env.PORT || 8080;

connection
  .authenticate()
  .then(() => {
    console.log(`Conexão feita com o DB!`);

    return Question.sync({ force: false });
  })
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");

    const app = express();
    app.set("view engine", "ejs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.use("/", questionRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Erro ao sincronizar modelos:", error);
  });
