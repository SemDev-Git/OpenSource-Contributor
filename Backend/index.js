// var express = require('express')
// var cors = require('cors')
import express from 'express'
import cors from 'cors'


const fetch = (...args)=>
    import('node-fetch').then(({default: fetch}) => fetch(...args))
// var bodyParser = require('body-parser')
import bodyParser from 'body-parser'
const CLIENT_ID = "Ov23licc0R42GG7WK2wm"
const CLIENT_SECRET = "3e5337d302e86be5ec188e69cff07b310f9a4268"

const app = express()


app.use(cors());
app.use(bodyParser.json());

//code being passed from the frontend
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
    console.log("Cors server running on port 4000");
})