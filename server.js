const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const posts = require("./routes/posts");
const users = require("./routes/users");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, () => {
  console.log("MongoDB connected");
});

app.listen(3000, () => {
  console.log("Listening");
});

app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/users", users);
