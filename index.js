const express = require('express');

const { pool } = require('./database');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'endpoint working' });
});

//start server
app.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}/`);
});
