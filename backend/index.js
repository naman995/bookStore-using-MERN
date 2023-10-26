import express, { request } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookmodel.js";
import bookRoute from "./routes/bookRoutes.js";
import cors from "cors";

const app = express();
// Middleware for parsing request body
app.use(express.json());
// Middleware for handling CORS Policys.
// Option 1 : Allow All Origins with Default of cors(*)
// app.use(cors());
// option 2 :Allows custom origins
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  // console.log(req);
  return res.status(234).send("Hello world");
});
app.use("/books", bookRoute);
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening to port ${PORT}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
