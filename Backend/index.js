import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import axios from 'axios';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config({ path: './.env' });

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Attach routes with prefixes
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/projects', projectRoutes);

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

// Fetch GitHub User Data
app.get('/getUserData', async (req, res) => {
  try {
    const authorization = req.get('Authorization');
    if (!authorization) throw new Error('Authorization header is required');
    const response = await fetch('https://api.github.com/user', {
      method: 'GET',
      headers: { Authorization: authorization },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to fetch user data');
    res.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch Popular Repositories
app.get('/api/repositories', async (req, res) => {
  try {
    const response = await axios.get('https://api.github.com/search/repositories?q=stars:%3E100000&sort=stars&order=desc');
    const repositories = response.data.items.map((item) => ({
      id: item.id,
      avatarUrl: item.owner.avatar_url,
      title: item.name,
    }));
    res.json(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});
