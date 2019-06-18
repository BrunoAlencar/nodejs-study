const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is on the port: " + port);
});

// https://httpstatuses.com/

const Task = require("./models/task");
const User = require("./models/user");

const main = async () => {
  // const task = await Task.findById("5d093d5c49935b2ef8c6b8a3");
  // await task.populate("owner").execPopulate();
  // console.log(task.owner);
  const user = await User.findById("5d08fcd9a0645004bc0c7a92");
  await user.populate("tasks").execPopulate();
  console.log(user.tasks);
};

main();
