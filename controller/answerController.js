const dbconnection = require("../db/dbConfig");
const { StatusCodes, BAD_GATEWAY } = require("http-status-codes");
const jwt = require("jsonwebtoken");

async function postAnswer(req, res) {
    const {answer, userid, questionid} = req.query;
    if (!answer  || !userid || !questionid) {
      return res
        .status(400)
        .json({ msg: "Please provide all required information" });
    }
    try {
      await dbconnection.query(
        "INSERT INTO ANSWERS (answer, userid, questionid) VALUES(?,?,?)",
        [answer,userid,questionid]
      );
      return res.status(StatusCodes.CREATED).json({ msg: "answer added" });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, try again" });
    }
  }
  async function getAnswer(req, res) {
    try {
      const allAnswer = await dbconnection.query("SELECT * FROM ANSWERS");
      return res.status(StatusCodes.CREATED).json({ allAnswer });
    } catch (error) {
      console.log(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ msg: "Something went wrong, try again" });
    }
  }

  module.exports = {postAnswer, getAnswer}