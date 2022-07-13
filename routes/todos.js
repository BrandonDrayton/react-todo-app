const express = require('express');
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();
const models = require('../models')

// POST /api/v1/todos
router.post('/', checkAuth, async function (req, res, next) {
  // check for required fields
  if (!req.body.text) {
    res.status(400).json({ error: 'Please include todo text' })
    return
  }

  // create new todo in db
  const todo = await req.session.user.createTodo({
    text: req.body.text,
    priority: req.body.priority || 'low',
    color: req.body.color || '',
  })
  // respond with success
  res.status(201).json(todo)
});

// GET /api/v1/todos
router.get('/', checkAuth, async (req, res) => {
  // get all todos for logged in user
  const todos = await req.session.user.getTodos({
    order: [['createdAt', 'DESC']]
  })
  // send as json
  res.json(todos)
})

// DELETE /api/v1/todos/:id
router.delete('/:id', checkAuth, async (req, res) => {
  // get todo from db using id
  const todo = await models.Todo.findByPk(req.params.id)
  // if no todo, send 404 or
  // if todo not owned by current user, send 404
  if (!todo || todo.UserId !== req.session.user.id) {
    res.status(404).json({ error: 'cannot find todo with id ' + req.params.id })
    return
  }
  // destroy todo
  await todo.destroy()
  // send success message
  res.status(200).json({ success: 'deleted todo' })
})

// PATCH /api/v1/todos/:id
router.patch('/:id', async (req, res) => {
  // get todo from db using id
  const todo = await models.Todo.findByPk(req.params.id)
  // if no todo, send 404 or
  // if todo not owned by current user, send 404
  if (!todo || todo.UserId !== req.session.user.id) {
    res.status(404).json({ error: 'cannot find todo with id ' + req.params.id })
    return
  }
  // update todo
  await todo.update({
    text: req.body.text || todo.text,
    priority: req.body.priority || todo.priority,
    color: req.body.color || todo.color,
  })

  res.status(200).json(todo)
})

module.exports = router;