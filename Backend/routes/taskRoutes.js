import express from 'express';
import Task from '../models/task.model.js'

const router = express.Router();
router.post('/api/tasks', async (req, res) => {
    try {
        const task = new Task(req.body);
        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating task' });
    }
});

// used when task status updated
router.patch('/api/tasks/:taskId', async (req, res) => {
    try {
        const { taskId } = req.params;
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status: req.body.status },
            { new: true } 
        );
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating task' });
    }
});

export default router;
