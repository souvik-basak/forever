import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, authorization denied" });
  }

  try {
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decoded.id;
    next();
  } catch (error) {
    res.status(400).json({ success: false, message: "Token is not valid" });
  }
};

export default authUser;
