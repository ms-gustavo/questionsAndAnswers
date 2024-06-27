export const mockQuestions = [
  {
    id: 1,
    title: "Test Question",
    description: "Test Description",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockNewQuestion = {
  title: "New Test Question",
  description: "New Test Description",
};

export const mockAnswers = [
  {
    id: 1,
    body: "Test Answer",
    questionId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockNewAnswer = {
  body: "New Test Answer",
  questionId: 1,
};
