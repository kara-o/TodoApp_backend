const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const jwt = require("express-jwt");
const jwks = require("jwks-rsa");
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

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://reactapps.auth0.com/.well-known/jwks.json",
  }),
  audience: "http://localhost:5000/api",
  issuer: "https://reactapps.auth0.com/",
  algorithms: ["RS256"],
});

//do not need authorization
app.post("/api/users", createUser);
app.post("/api/users/login", loginUser);

app.use(jwtCheck);

//TODOS
app.get("/api/todos", getTodos);
app.get("/api/todos/:id", getTodoById);
app.post("/api/todos", createTodo);
app.patch("/api/todos/:id/toggle", toggleTodo);
app.delete("/api/todos/:id", deleteTodo);

//USERS
app.get("/api/users", getUsers);
app.get("/api/users/:id", getUserById);

//start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
