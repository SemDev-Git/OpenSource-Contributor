import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import axios from 'axios';

dotenv.config({
    path: './.env'
})

const fetch = (...args)=>
    import('node-fetch').then(({default: fetch}) => fetch(...args))
import bodyParser from 'body-parser'
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const app = express()


app.use(cors());
app.use(bodyParser.json());

app.get('/getAccessToken', async function (req, res) {
    
    console.log(req.query.code);
    const params ="?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&code="+ req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params,{
        method:"POST",
        headers:{
            "Accept":"application/json" 
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data);
        res.json(data)
    });
    
});

//Get User Data
// access token is going to be passed in an authorization header
app.get('/getUserData', async function (req, res) {
    
    req.get("Authorization");//bearer access token
    await fetch("https://api.github.com/user", {
        method:"GET",
        headers:{
            "Authorization" : req.get("Authorization")// bearer access token
        }
    }).then((response)=>{
        return response.json()
    }).then((data)=>{
        console.log(data);
        res.json(data)
    })
    
})
app.get('/api/repositories', async (req, res) => {
    try {
      // Fetch repositories from GitHub API (repositories with more than 100,000 stars)
      const response = await axios.get('https://api.github.com/search/repositories?q=stars:%3E100000&sort=stars&order=desc');
      const repositories = response.data.items.map(item => ({
        id: item.id,
        avatarUrl: item.owner.avatar_url,  // Avatar URL
        title: item.name,  // Repository name
      }));
  
      // Send the data to the frontend
      res.json(repositories);
    } catch (error) {
      console.error('Error fetching data from GitHub API:', error);
      res.status(500).json({ error: 'Failed to fetch data from GitHub API' });
    }
  });

app.listen(4000,function(){
    connectDB()
    .then(()=>{
        console.log(`Server is running at port ${process.env.PORT}`)
    })
    .catch((err)=>{
        console.log("MongoDB connection failed",err);
})
    console.log("Cors server running on port 4000");
})