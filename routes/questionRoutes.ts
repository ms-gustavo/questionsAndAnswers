import express, { Request, Response } from "express";
import Question, { IQuestionForm } from "../database/Question";
import { IDBQuestions, QuestionSchema } from "../utils/questionSchema";
import Answer, { IAnswerForm } from "../database/Answer";

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
    res.redirect("/error?type=list-error");
  }
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
      res.redirect("/error?type=list-unique-error");
    }
  } catch (error: any) {
    console.error("Erro ao buscar pergunta:", error);
    res.redirect("/error?type=list-unique-error");
  }
});

router.post(
  "/send-questions",
  async (req: Request<IQuestionForm>, res: Response) => {
    const { title, description }: IQuestionForm = req.body;
    try {
      if (!title || !description) {
        return res.redirect("/error?type=form-error");
      }

      await Question.create({ title, description }).then(() => {
        res.redirect("/");
      });
    } catch (error: any) {
      console.error("Erro ao criar pergunta:", error);
      res.redirect("/error?type=form-error");
    }
  }
);

router.post(
  "/send-answer",
  async (req: Request<IAnswerForm>, res: Response) => {
    const { body, questionId }: IAnswerForm = req.body;
    try {
      if (!body || !questionId) {
        return res.redirect("/error?type=form-error");
      }

      await Answer.create({ body, questionId }).then(() => {
        res.redirect(`/question/${questionId}`);
      });
    } catch (error: any) {
      console.error("Erro ao responder pergunta:", error);
      res.redirect("/error?type=form-error");
    }
  }
);

router.get("/error", (req: Request, res: Response) => {
  const type = req.query.type as string;
  let action, linkText;

  if (type === "form-error") {
    action = "javascript:history.back()";
    linkText = "Clique aqui para tentar novamente";
  } else if (type === "list-unique-error") {
    action = "javascript:history.back()";
    linkText = "Clique aqui para tentar novamente";
  } else if (type === "list-error") {
    action = "javascript:location.reload(true)";
    linkText = "Clique aqui para recarregar";
  } else {
    return res.status(404).render("404");
  }

  res.render("error", { type, action, linkText });
});

export default router;
