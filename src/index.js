import { app } from "./app/index.js";
import { config } from "./config/index.js";

const server = app.listen(process.env.PORT || config.port, () => {
  console.log("server running");
});
