import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

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