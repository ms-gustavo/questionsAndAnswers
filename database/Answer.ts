import { DataTypes } from "sequelize";
import connection from "./database";

export interface IAnswerForm {
  body: string;
  questionId: number;
}

const Answer = connection.define("answer", {
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Answer;
