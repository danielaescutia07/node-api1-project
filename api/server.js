// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();

server.get('/api/users', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({
      message: 'User not found',
      error: err.message
    })
  }
});

server.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: `user with id ${id} not found`,
      error: err.message
    })
  }
});

server.use('*', (req, res) => {
  res.status(404).json({
    message: 'not found'
  });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
