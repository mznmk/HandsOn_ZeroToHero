// [ import ]
const express = require("express");
const app = express();

const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");

// [ const variable ]
const PORT = 3000;
const {
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

// [ routing ]
app.use("/api/v1/tasks", taskRoute);

// [ connect database ]
// [ start server ]
const mongoUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const start = async () => {
  try {
    connectDB(mongoUrl);
    app.listen(PORT, console.log("start server..."));
  } catch (err) {
    console.log(err);
  }
};

start();