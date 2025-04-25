// routes/todos.js
const express = require('express');
const router = express.Router();

let todos = [];
let currentId = 1;

// GET all
router.get('/', (req, res) => {
  res.json(todos);
});

// GET by id
router.get('/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });
  res.json(todo);
});

// POST create
router.post('/', (req, res) => {
  const { title } = req.body;
  const newTodo = { id: currentId++, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update
router.put('/:id', (req, res) => {
  const { title, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: 'Not found' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE
router.delete('/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Not found' });

  todos.splice(index, 1);
  res.status(204).end();
});

module.exports = router;