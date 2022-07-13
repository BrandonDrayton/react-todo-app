const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const models = require('../models');
const checkAuth = require('../middleware/checkAuth');

// POST /api/v1/users/register
router.post('/register', async (req, res) => {
  // confirm body has email and password
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Please include email and password' })
    return
  }
  // check for already registered email
  const exisingUser = await models.User.findOne({
    where: { email: req.body.email }
  })
  if (exisingUser) {
    // respond with error
    res.status(400).json({ error: 'Email already in use' })
    return
  }
  // hash password
  const hash = await bcrypt.hash(req.body.password, 10)
  // store user in db
  const user = await models.User.create({
    email: req.body.email,
    password: hash
  })
  // respond w success
  res.status(201).json({ success: 'User registered' })
});

// POST /api/v1/users/login
router.post('/login', async (req, res) => {
  // check for email and password
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ error: 'Please include email and password' })
    return
  }
  // find user in db
  const user = await models.User.findOne({ where: { email: req.body.email } })
  // if they don't exist, send error
  if (!user) {
    res.status(400).json({ error: 'Email incorrect' })
    return
  }
  // check password is correct
  const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
  // if incorrect, send error
  if (!passwordCorrect) {
    res.status(400).json({ error: 'Password incorrect' })
    return
  }
  // set user in session
  req.session.user = user
  // respond with success
  res.json({ success: 'successfully logged in' })
})

// GET /api/v1/users/logout
router.get('/logout', (req, res) => {
  req.session.user = null
  res.json({ success: 'successfully logged out' })
})

// GET /api/v1/users/current
router.get('/current', (req, res) => {
  if (!req.session.user) {
    res.json()
    return
  }
  res.json({
    id: req.session.user.id,
    email: req.session.user.email,
    createdAt: req.session.user.createdAt,
    updatedAt: req.session.user.updatedAt,
  })
})

module.exports = router;