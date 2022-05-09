import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { errorResponse } from "./../utils/index.js";

export const authentication = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!!auth) {
    const token = auth.split("Bearer ").join("");

    // verificar token
    jwt.verify(token, config.token.secret, (err, payload) => {
      if (err) throw errorResponse(401, "Invalid token");
      //
      req.auth = payload; // send data user auth
      next();
    });
    //
  } else res.status(401).json({ message: "Token required" });
};
