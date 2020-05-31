const db = require("./config");

const getUsers = (req, res) => {
  db.pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  db.pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { username, email } = req.body;
  const createdOn = new Date();

  db.pool.query(
    "INSERT INTO users (username, email, created_on) VALUES ($1, $2, $3) RETURNING id",
    [username, email, createdOn],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ id: result.rows[0].id });
    }
  );
};

const loginUser = (req, res) => {
  const { username, email } = req.body;

  db.pool.query(
    "SELECT * FROM todos INNER JOIN users ON users.id IN (SELECT id FROM users WHERE username = $1 AND email = $2) = todos.user_id",
    [username, email],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).json(result.rows);
    }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  loginUser,
};
