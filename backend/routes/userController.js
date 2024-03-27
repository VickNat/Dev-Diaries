const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const refreshTokenSecret = 'yourrefreshtokensecrethere';
const accessTokenSecret = 'youraccesstokensecrethere';
const refreshTokens = [];

// Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  let userExists = await User.find({ email: req.body.email })

  if (userExists.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  userExists = await User.find({ username: req.body.username })

  if (userExists.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

// authenticat JWT
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

// Endpoint to generate new access and refresh tokens
router.post('/token', (req, res) =>{
  const { refreshToken } = req.body;
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }
  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '15m' });
    res.json({ accessToken });
  });
})

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.find({ username });

  console.log("User", user);
  if (user.length === 0) {
    return res.status(400).json({ message: 'User not found' });
  }
  if (user[0].password !== password) {
    return res.status(401).json({ message: 'Incorrect password' });
  }
  const payload = { ...user };
  delete payload.password;
  const options = { expiresIn: '1d' };
  const accessToken = jwt.sign(payload, accessTokenSecret, options);
  const refreshToken = jwt.sign(payload, refreshTokenSecret);
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
})

// Endpoint to log out and revoke refresh token
router.post('/logout', (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.sendStatus(400);
  }

  const index = refreshTokens.indexOf(refreshToken);
  if (index !== -1) {
    refreshTokens.splice(index, 1);
  }

  res.sendStatus(204);
})

module.exports = router;