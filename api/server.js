// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');
const server = express();

server.use(express.json());

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

server.post('/api/users', async (req, res) => {
  const { body } = req;
  try {
    const newUser = await User.insert(body);
    if (!newUser.name || !newUser.bio) {
      res.status(400).json({
        message: 'Please provide name and bio for the user'
      })
    } else {
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({
      message: 'There was an error while saving the user to the database',
      error: err.message
    })
  }
});

server.put('/api/users/:id', async (req, res) => {
  const { id } = req.param;
  const { body } = req;
  try {
    const updatedUser = await User.update(id, body);
    if (!updatedUser) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else if (!updatedUser.name || !updatedUser.bio) {
      res.status(400).json({
        message: 'Please provide name and bio for the user'
      })
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: 'The user information could not be modified',
      error: err.message
    })
  }
});

server.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.remove(id);
    if (!deletedUser) {
      res.status(404).json({
        message: 'The user with the specified ID does not exist'
      })
    } else {
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: 'The user could not be removed',
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
