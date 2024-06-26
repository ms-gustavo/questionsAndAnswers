import { DataTypes } from "sequelize";
import connection from "./database";

export interface IQuestionForm {
  title: string;
  description: string;
}

const Question = connection.define("question", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Question;
