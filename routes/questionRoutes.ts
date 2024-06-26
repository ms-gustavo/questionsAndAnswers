import express, { Request, Response } from "express";
import Question, { IQuestionForm } from "../database/Question";
import { Model } from "sequelize";
import { IDBQuestions, QuestionSchema } from "../utils/questionSchema";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const questions = await Question.findAll({
      raw: true,
      order: [["id", "desc"]],
    });
    const DBQuestions: IDBQuestions[] = questions.map((question: any) => {
      const parsedQuestion = QuestionSchema.parse(question);
      return parsedQuestion;
    });
    res.render("index", { questions: DBQuestions });
  } catch (error) {
    console.error("Erro ao buscar perguntas:", error);
    res.redirect("/index-error");
  }
});
router.get("/index-error", (req: Request, res: Response) => {
  res.render("index-error");
});

router.get("/questions", (req: Request, res: Response) => {
  res.render("questions");
});

router.get("/question/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const question = await Question.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (question) {
      const parsedQuestion: IDBQuestions = QuestionSchema.parse(question);
      return res.render("question", { question: parsedQuestion });
    } else {
      res.redirect("/index-error");
    }
  } catch (error: any) {
    console.error("Erro ao buscar pergunta:", error);
    res.redirect("/index-error");
  }
});

router.get("/question-error", (req: Request, res: Response) => {
  res.render("question-error");
});

router.post(
  "/send-questions",
  async (req: Request<IQuestionForm>, res: Response) => {
    const { title, description }: IQuestionForm = req.body;
    try {
      if (!title || !description) {
        return res.redirect("/error");
      }

      await Question.create({ title, description });

      res.redirect("/");
    } catch (error: any) {
      console.error("Erro ao criar pergunta:", error);
      res.redirect("/question-error");
    }
  }
);

export default router;
