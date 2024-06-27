import app from "./app";
import connection from "../database/database";
import Question from "../database/Question";
import Answer from "../database/Answer";

const PORT = process.env.PORT || 8080;

connection
  .authenticate()
  .then(async () => {
    console.log(`Conexão feita com o DB!`);

    await Question.sync({ force: false });
    return await Answer.sync({ force: false });
  })
  .then(() => {
    console.log("Modelos sincronizados com o banco de dados.");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error("Erro ao sincronizar modelos:", error);
  });
