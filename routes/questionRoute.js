const express = require("express");
const { addquestion, getQuestions } = require("../controller/questionController");
const router = express.Router()
//authntication middleware
const authMiddleware = require("../middleware/authMiddleware")

router.get("/",authMiddleware, getQuestions)    
router.post("/",addquestion)
module.exports = router