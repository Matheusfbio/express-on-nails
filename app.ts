import "dotenv/config";

import express, { Router } from "express";
//for  middleware
import bodyParser from "body-parser";
import cors from "cors";
import ProductsRouter from "@routes/products.routes";
import UsersRouter from "@routes/user.routes";
const app = express();

const port = process.env.PORT || 3001;
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(cors());

app.get("/", (request, response) => {
  response.json("Welcome the express on nails");
});

app.use("/api", ProductsRouter);
app.use("/api", UsersRouter);

app.listen(port, () => {
  console.log(`Server is runnnig on port http://localhost:${port}`);
});
