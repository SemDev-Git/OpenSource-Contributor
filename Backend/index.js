import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import User from './models/user.model.js'; // Import the User model
import Project from './models/project.model.js'; // Import the User model
import Task from './models/task.model.js'; // Import the User model

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config({ path: './.env' });

const CLIENT_ID = "Ov23licc0R42GG7WK2wm";
const CLIENT_SECRET = "6fe4fdedc39fd7849cf701e2e343e788ca17df34";
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes); // Make sure this line is correct

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