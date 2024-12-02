import express from 'express';
import Project from '../models/project.model.js'

const router = express.Router();
router.post('/api/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating project' });
    }
});

export default router;
