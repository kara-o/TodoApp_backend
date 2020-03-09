const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const db = require('./database');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get('/api', (req, res) => {
  res.json({ info: 'Node, Express, Postgres API' });
});

//start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//for each endpoint, set HTTP request method, endpoint URL path, and relevant function
app.get('/api/todos', db.getTodos);
app.get('/api/todos/:id', db.getTodoById);
app.post('/api/todos', db.createTodo);

app.get('/api/express_backend', (req, res) => {
  res.send({ message: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
