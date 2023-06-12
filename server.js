const express = require('express');
const app = express();
require('dotenv').config({ path: "./config/.env" });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connection to database
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(express.json());


// GET: Return all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving users' });
    }
  });
  
// POST: Add a new user to the database
  app.post('/users', async (req, res) => {
    try {
      const { name, email, age } = req.body;
      const user = new User({ name, email, age });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error adding user' });
    }
  });
  
// PUT: Edit a user by ID
  app.put('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, age } = req.body;
      const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error updating user' });
    }
  });
  

// DELETE: Remove a user by ID
  app.delete('/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user' });
    }
  });
  
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to the database');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });
    module.exports = router;