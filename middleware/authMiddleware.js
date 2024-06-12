const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
async function authMiddleware(req, res, next) {
  const autHeader = req.headers.authorization;
  console.log(autHeader);
  if (!autHeader || !autHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }

  const token = autHeader.split(" ")[1];
//   console.log(autHeader.split(" "))

  try {
    const { username, userid } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "authentication invalid" });
  }
}
module.exports = authMiddleware;
