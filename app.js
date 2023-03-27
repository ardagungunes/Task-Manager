const express = require("express");
const app = express();
const tasks = require("./routers/tasks.js");
const connectDB = require("./db/connect.js");
const notFound = require("./middleware/not-found.js");
require("dotenv").config();

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.use("/api/v1/tasks", tasks);
app.use(notFound);

//routes

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port: ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
