const db = require("./config");

const getTodos = (req, res) => {
  const { user_id } = req.query;
  db.pool.query(
    "SELECT * FROM todos WHERE user_id = $1 ORDER BY id ASC",
    [user_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);

  db.pool.query("SELECT * FROM todos WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const createTodo = (req, res) => {
  const { text, userId } = req.body;
  const createdOn = new Date();

  db.pool.query(
    "INSERT INTO todos (text, created_on, user_id) VALUES ($1, $2, $3) RETURNING id",
    [text, createdOn, userId],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).json({ id: result.rows[0].id });
    }
  );
};

const toggleTodo = (req, res) => {
  const completed = req.body.completed;
  const id = req.params.id;
  db.pool.query(
    "UPDATE todos SET completed = $1 WHERE id = $2",
    [completed, id],
    (error, result) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        message: `Successfully toggled complete status of todo with id ${id} to ${completed}`,
      });
    }
  );
};

const deleteTodo = (req, res) => {
  const id = req.params.id;
  db.pool.query("DELETE FROM todos WHERE id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    res.status(201).json({
      message: `Successfully deleted todo with ${id}`,
    });
  });
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  toggleTodo,
  deleteTodo,
};
