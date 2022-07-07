const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");
const { authenticate } = require("./middleware/authentication");

require("dotenv").config();
const { MONGO_URI, PORT } = process.env;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MoogoDB Connected");
    app.use("/uploads", express.static("uploads"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(authenticate);
    app.use("/images", imageRouter);
    app.use("/users", userRouter);
    app.listen(PORT, () => {
      console.log("http://localhost:4000 runing");
    });
  })
  .catch((err) => console.log(err));
