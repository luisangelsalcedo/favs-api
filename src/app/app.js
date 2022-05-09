import express from "express";
import userRoutes from "../routes/user.routes.js";
import favsRoutes from "../routes/favs.routes.js";
import templateRoutes from "../routes/template.routes.js";
import { authentication, errorHandler } from "../middlewares/index.js";

import cors from "cors";
import "./dataBase.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use("/api/*", authentication);

// template
app.set("view engine", "ejs");

// routes
app.use(userRoutes);
app.use(favsRoutes);
app.use(templateRoutes);

// error handler
app.use(errorHandler);

export default app;
