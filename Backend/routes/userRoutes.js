import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

// Create a User
router.post('/api/users', async (req, res) => {
  try {
    // Validate incoming request data
    if (!req.body.username || !req.body.fullname || !req.body.avatar) {
      return res.status(400).json({ error: 'Username, fullname, and avatar are required.' });
    }

    // Create and save the new user
    const user = new User(req.body);
    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to create user.' });
  }
});

// Delete a User
router.delete('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user exists and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to delete user.' });
  }
});

// Get a User by ID
router.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and populate taskAssign field
    const user = await User.findById(id).populate('taskAssign');

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch user.' });
  }
});

// Get all Users (Optional)
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch users.' });
  }
});

// Update a User (PATCH)
router.patch('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Update only the provided fields
    for (let field in updateFields) {
      if (user[field] !== undefined) {
        user[field] = updateFields[field];
      }
    }

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to update user.' });
  }
});

export default router;