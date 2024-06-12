require("dotenv").config();
const express = require("express");
const app = express();
const port = 5500;

const cors = require("cors");
app.use(cors());
//db conncetion
const dbconnection = require("./db/dbConfig");

//user routes middleware
const userRoute = require("./routes/userroute");

//question route
const questionRoute = require("./routes/questionRoute");

const answerRoute = require("./routes/answerRoute");

const authMiddleware = require("./middleware/authMiddleware");
//json middleware to extract json data
app.use(express.json());

// json middleware to extract json data
app.use("/api/users", userRoute);

app.use("/api/questions", questionRoute);

app.use("/api/answer", answerRoute);

async function start() {
  try {
    const result = await dbconnection.execute("select 'test'");
    await app.listen(port);
    console.log(`database connection  established on ${port}`);
  } catch (error) {
    console.log(error.message);
  }
}
start();
