import express from 'express';
import Project from '../models/project.model.js';

const router = express.Router();

// Create a Project
router.post('/api/projects', async (req, res) => {
  try {
    // Validate the incoming request body
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    // Create and save the project
    const project = new Project(req.body);
    const savedProject = await project.save();

    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to create project.' });
  }
});

// Delete a Project
router.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the project by ID
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.status(200).json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Error deleting project:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to delete project.' });
  }
});

// Get all Projects
router.get('/api/projects', async (req, res) => {  // Removed ':id' from route
  try {
    const projects = await Project.find(); // Fetch all projects
    res.status(200).json(projects); // Return all projects as JSON
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch projects.' });
  }
});

export default router;