import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  //Verify auth//
  const { authorization } = req.headers;
  console.log("auth", authorization);

  //Check for token//
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  console.log("token", token);

  try {
    const id = jwt.verify(token, process.env.SECRET);
    const _id = id.id;

    req.user = await User.findOne({ _id }).select("id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

export default requireAuth;
