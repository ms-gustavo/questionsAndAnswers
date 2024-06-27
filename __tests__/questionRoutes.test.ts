import request from "supertest";
import Question from "../database/Question";
import app from "../src/app";
import Answer from "../database/Answer";
import {
  mockQuestions,
  mockAnswers,
  mockNewQuestion,
  mockNewAnswer,
} from "./testData";

jest.mock("../database/Question");
jest.mock("../database/Answer");

describe("Test Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /", () => {
    it("should return 200 OK and render index with question", async () => {
      (Question.findAll as jest.Mock).mockResolvedValue(mockQuestions);

      const res = await request(app).get("/");

      expect(res.status).toBe(200);
      expect(res.text).toContain("Test Question");
    });
  });

  describe("GET /question", () => {
    it("should return 200 OK and render question page", async () => {
      const res = await request(app).get("/questions");

      expect(res.status).toBe(200);
    });
  });

  describe("GET /question/:id", () => {
    it("should return 200 OK and render question with answer", async () => {
      (Question.findOne as jest.Mock).mockResolvedValue(mockQuestions[0]);
      (Answer.findAll as jest.Mock).mockResolvedValue(mockAnswers);

      const res = await request(app).get("/question/1");

      expect(res.status).toBe(200);
      expect(res.text).toContain("Test Question");
      expect(res.text).toContain("Test Answer");
    });

    it("should redirect if question not found", async () => {
      (Question.findOne as jest.Mock).mockResolvedValue(null);
      const res = await request(app).get("/question/1");

      expect(res.status).toBe(302);
      expect(res.header.location).toBe("/error?type=list-unique-error");
    });
  });

  describe("POST /send-questions", () => {
    it("should redirect to / on success", async () => {
      (Question.create as jest.Mock).mockResolvedValue(mockNewQuestion);

      const res = await request(app)
        .post("/send-questions")
        .send(mockNewQuestion);
      expect(res.status).toBe(302);
      expect(res.header.location).toBe("/");
    });

    it("should redirect to /error?type=form-error if title or description is missing", async () => {
      const res = await request(app)
        .post("/send-questions")
        .send({ title: "", description: "" });

      expect(res.status).toBe(302);
      expect(res.header.location).toBe("/error?type=form-error");
    });
  });

  describe("POST /send-answer", () => {
    it("should redirect to /question/:id on success", async () => {
      (Answer.create as jest.Mock).mockResolvedValue(mockNewAnswer);

      const res = await request(app).post("/send-answer").send(mockNewAnswer);

      expect(res.status).toBe(302);
      expect(res.headers.location).toBe(
        `/question/${mockNewAnswer.questionId}`
      );
    });

    it("should redirect to /error?type=form-error if body or questionId is missing", async () => {
      const res = await request(app)
        .post("/send-questions")
        .send({ body: "", questionId: "" });

      expect(res.status).toBe(302);
      expect(res.header.location).toBe("/error?type=form-error");
    });
  });

  describe("GET /error", () => {
    it("should return 200 OK and render error page", async () => {
      const res = await request(app).get("/error?type=form-error");
      expect(res.status).toBe(200);
      expect(res.text).toContain("Clique aqui para tentar novamente");
    });

    it("should return 404 if error type is not recognized", async () => {
      const res = await request(app).get("/error?type=unknown");
      expect(res.status).toBe(404);
    });

    it("should return 404 if route does not exists", async () => {
      const res = await request(app).get("/unknown-route");
      expect(res.status).toBe(404);
      expect(res.text).toContain("Página não encontrada");
    });
  });
});
