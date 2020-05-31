const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const {
  getTodos,
  getTodoById,
  createTodo,
  toggleTodo,
  deleteTodo,
} = require("./db/todos");
const { getUsers, getUserById, createUser, loginUser } = require("./db/users");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//for each endpoint, set HTTP request method, endpoint URL path, and relevant function

//TODOS
app.get("/api/todos", getTodos);
app.get("/api/todos/:id", getTodoById);
app.post("/api/todos", createTodo);
app.patch("/api/todos/:id/toggle", toggleTodo);
app.delete("/api/todos/:id", deleteTodo);

//USERS
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);
app.post("/api/users", createUser);
app.post("/api/users/login", loginUser);

//start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
