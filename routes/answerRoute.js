const express = require("express");
const { postAnswer, getAnswer } = require("../controller/answerController")
const router = express.Router()

router.get("/",getAnswer)    
router.post("/",postAnswer)
module.exports = router