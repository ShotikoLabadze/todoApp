const { db } = require("../utils/db");

exports.getTasks = async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
      req.userId,
    ]);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });

    const [result] = await db.query(
      "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
      [title, description || "", status || "todo", req.userId]
    );

    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [
      result.insertId,
    ]);
    res.status(201).json(task[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const [result] = await db.query(
      "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
      [title, description, status, id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    res.json(task[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM tasks WHERE id = ? AND user_id = ?",
      [id, req.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
