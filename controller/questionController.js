const dbconnection = require("../db/dbConfig");
const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function addquestion(req, res) {
  const { title, description, tag, questionid, userid } = req.body;

  if (!title || !description || !tag || !questionid || !userid) {
    return res
      .status(400)
      .json({ msg: "Please provide all required information" });
  }
  try {
    await dbconnection.query(
      "INSERT INTO QUESTIONS (title, description, tag, questionid, userid) VALUES(?,?,?,?,?)",
      [title, description, tag, questionid, userid]
    );
    return res.status(StatusCodes.CREATED).json({ msg: "question added" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }
}
async function getQuestions(req, res) {
  console.log(req.user);
  try {
    const questions = await dbconnection.query(
      "SELECT Questions.title,Questions.description,ANSWERS.answer, USERS.firstname,USERS.lastname FROM QUESTIONS LEFT JOIN ANSWERS ON QUESTIONS.questionid = ANSWERS.questionid JOIN USERS ON QUESTIONS.userid = USERS.userid "
    );
    return res.status(StatusCodes.CREATED).json({ questions: questions[0] });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again" });
  }
}

module.exports = { addquestion, getQuestions };
