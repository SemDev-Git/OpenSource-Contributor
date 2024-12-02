import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import fetch from 'node-fetch';
import User from './models/user.model.js'; // Import the User model
import Project from './models/project.model.js';

dotenv.config({ path: './.env' });

const CLIENT_ID = "Ov23licc0R42GG7WK2wm";
const CLIENT_SECRET = "6fe4fdedc39fd7849cf701e2e343e788ca17df34";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Fetch GitHub Access Token
app.get('/getAccessToken', async (req, res) => {
  try {
    const params = `?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`;
    const response = await fetch(`https://github.com/login/oauth/access_token${params}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch access token');
    res.json(data);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch GitHub User Data and Store in Database
  app.get('/getUserData', async (req, res) => {
    try {
      const authorization = req.get('Authorization');
      if (!authorization) {
        return res.status(400).json({ error: 'Authorization header is required' });
      }

      // Fetch GitHub User Data
      const userResponse = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: { Authorization: authorization },
      });

      if (!userResponse.ok) {
        const data = await userResponse.json();
        return res.status(userResponse.status).json({ error: data.message || 'Failed to fetch user data' });
      }

      const userData = await userResponse.json();
      const { login: githubUsername, name: fullname, avatar_url: avatar } = userData;

      // Fetch GitHub User Repositories
      const reposResponse = await fetch('https://api.github.com/user/repos', {
        method: 'GET',
        headers: {
          Authorization: authorization,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!reposResponse.ok) {
        const data = await reposResponse.json();
        return res.status(reposResponse.status).json({ error: data.message || 'Failed to fetch repositories' });
      }

      const repositories = await reposResponse.json();

      // Check if user already exists in database
      let user = await User.findOne({ username: githubUsername });
      let isNewUser = false;

      if (user) {
        // If user exists, update their info only if there are changes
        let hasChanges = false;

        if (user.fullname !== fullname) {
          user.fullname = fullname;
          hasChanges = true;
        }

        if (user.avatar !== avatar) {
          user.avatar = avatar;
          hasChanges = true;
        }

        // Update repos and projectID
        const currentRepos = user.repos || [];
        const newRepos = repositories.map((repo) => repo.html_url);

        newRepos.forEach((repo) => {
          if (!currentRepos.includes(repo)) {
            currentRepos.push(repo);
          }
        });

        repositories.forEach((repo, index) => {
          const projectID = `${githubUsername}${index + 1}`;
          if (!user.projectID.includes(projectID)) {
            user.projectID.push(projectID);
          }
        });

        user.repos = currentRepos;

        if (hasChanges) {
          await user.save();
        }
      } else {
        // If user doesn't exist, create a new user
        isNewUser = true;

        user = new User({
          username: githubUsername,
          fullname: fullname,
          avatar: avatar,
          repos: repositories.map((repo) => repo.html_url),
          projectID: repositories.map((_, index) => `${githubUsername}${index + 1}`),
          like: [],
          dislike: [],
          progLang: [],
          coreInterest: [],
          hobbies: [],
          projectAssign: [],
          contributionsTotal: 0,
          taskAssign: [],
        });

        await user.save();
      }

      // Send the user data and repositories in the response
      res.status(200).json({
        message: user ? 'User data updated' : 'New user created',
        user: {
          _id: user._id,
          username: user.username,
          fullname: user.fullname,
          avatar: user.avatar,
          repos: user.repos,
        },
        isNewUser,
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/getProjectData', async (req, res) => {
    try {
      // Check if user already exists in database
      let project = await Project();
      
      res.status(200).json({
        message: user ? 'User data updated' : 'New user created',
        project
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create a Project
app.post('/api/projects', async (req, res) => {
  try {
      console.log('Request body:', req.body);
      const { username, title, description, guidelines, gitlink } = req.body;
      
      if (!title || !description) {
          return res.status(400).json({ error: 'Title and description are required.' });
      }

      const user = await User.findOne({ name: username });
      if (!user) {
          return res.status(404).json({ error: 'User not found.' });
      }

      const project = new Project({
          username: user._id,
          title: title,
          description: description,
          guidelines: guidelines,
          gitlink: gitlink,
      });

      const savedProject = await project.save();
      console.log('Project saved:', savedProject);
      res.status(201).json(savedProject);
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error: Unable to create project.' });
  }
});


// Delete a Project
app.delete('/api/projects/:id', async (req, res) => {
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
app.get('/api/projects', async (req, res) => {  // Removed ':id' from route
  try {
    const projects = await Project.find(); // Fetch all projects
    res.status(200).json(projects); // Return all projects as JSON
  } catch (error) {
    console.error('Error fetching projects:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch projects.' });
  }
});

// Create a User
app.post('/api/users', async (req, res) => {
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
app.delete('/api/users/:id', async (req, res) => {
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
app.get('/api/users/:id', async (req, res) => {
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
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch users.' });
  }
});

// Update a User (PATCH)
app.patch('/api/users/:id', async (req, res) => {
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

// Create a Task
app.post('/api/tasks', async (req, res) => {
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
app.delete('/api/tasks/:id', async (req, res) => {
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
app.get('/api/tasks/:id', async (req, res) => {
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
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find().populate('username project'); // Populate 'username' and 'project' with actual data
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Internal Server Error: Unable to fetch tasks.' });
  }
});

// Update a Task (PATCH)
app.patch('/api/tasks/:id', async (req, res) => {
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