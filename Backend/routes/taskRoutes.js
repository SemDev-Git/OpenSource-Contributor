import express from 'express';
import Task from '../models/task.model.js';

const router = express.Router();

// Create a Task
router.post('/api/tasks', async (req, res) => {
  try {
    // Validate incoming request data
    if (!req.body.detail) {
      return res.status(400).json({ error: 'Task detail is required.' });
    }

    // Create and save the new task
    const task = new Task(req.body);
    const savedTask = await task.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to create task.' });
  }
});

// Delete a Task
router.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the task exists and delete it
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to delete task.' });
  }
});

// Access Task (Get a Task by ID)
router.get('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the task by ID
    const task = await Task.findById(id).populate('username project');  // Populate 'username' and 'project' with actual data

    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error('Error fetching task:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch task.' });
  }
});

// Get all Tasks (Optional - In case you want a route to fetch all tasks)
router.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('username project'); // Populate 'username' and 'project' with actual data
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch tasks.' });
  }
});

// Update a Task (PATCH)
router.patch('/api/tasks/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updateFields = req.body;
  
      // Find the task by ID
      const task = await Task.findById(id);
  
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
      }
  
      // Update only the provided fields
      for (let field in updateFields) {
        if (task[field] !== undefined) {
          task[field] = updateFields[field];
        }
      }
  
      // Save the updated task
      const updatedTask = await task.save();
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error('Error updating task:', error.message);
      res.status(500).json({ error: 'Internal Server Error: Unable to update task.' });
    }
  });

export default router;