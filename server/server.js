import express from "express";
import exphbs from "express-handlebars";

import { coursesRouter } from "./routes/coursesRouter.js";
import { addRouter } from "./routes/addRouter.js";
import { homeRouter } from "./routes/homeRouter.js";

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

const app = express();

// Parsing json input
app.use(express.json());
app.use(express.urlencoded());

// View Engine
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "../views");

// Routes
app.use("/add", addRouter);
app.use("/courses", coursesRouter);
app.use("/*", homeRouter);

// PORT and server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
