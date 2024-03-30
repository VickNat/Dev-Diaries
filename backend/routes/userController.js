const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const refreshTokenSecret = 'yourrefreshtokensecrethere';
const accessTokenSecret = 'youraccesstokensecrethere';
const refreshTokens = [];

// Create a new user
router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword // Use the hashed password
    });

    let userExists = await User.findOne({ email: req.body.email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    userExists = await User.findOne({ username: req.body.username });

    if (userExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  try {
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const payload = { id: user._id, username: user.username };
    const accessToken = jwt.sign(payload, accessTokenSecret, { expiresIn: '1d' });
    const refreshToken = jwt.sign(payload, refreshTokenSecret);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

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