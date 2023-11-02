const express = require('express') 
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const User = require('./dataModels/User.js')
const bcrypt = require('bcryptjs')
const jsonToken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const jsonSecret = 'asbcnkvjnaknvka'

// const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken');



const app = express(); 
app.use(cookieParser()) //this middleware is used to read cookie which contains the token
app.use(express.json()) //middleware used so that the request comes over here to parse the string data in the json format
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}))

// app.get('/run', (req,res)=> {
//     res.json('running'); 
// })

const secretSalt = bcrypt.genSaltSync(12)

mongoose.connect(process.env.MONGO_URL)

// console.log(process.env.MONGO_URL)

app.post('/signup', async (req,res)=>{
    const {name,email,password} = req.body 
    try {
        const userDetails = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,secretSalt),
        })
        console.log(userDetails.name)
        // console.log('====================================');
        // console.log(req.body);
        // console.log('====================================');
        res.json(userDetails);
    } 
    catch (e) {
        res.status(422).json(e);
        console.log(e)
    }
})


app.post('/logging', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists in the database
        const userDetails = await User.findOne({ email: email });

        if (!userDetails) {
            // User not found
            res.status(404).json('User not found');
            console.log('User not found');
            return;
        }

        const passCheck = bcrypt.compareSync(password, userDetails.password);
        
        if (passCheck) {
            // Passwords match, issue a token and respond to the user
            // jsonToken.sign({ email: userDetails.email, id: userDetails._id }, jsonSecret, {}, (error, token) => {
            //     if (error) {
            //         throw error;
            //     } else {
                //     }
                // }) // Create a JSON Web Token and set a cookie
        
               const token =  jsonToken.sign({name:userDetails.name,email:userDetails.email,id:userDetails._id,password:userDetails.password},jsonSecret)

                res.cookie('token', token);
                res.json(userDetails)
                console.log('====================================');
                console.log("Token is generated",token);
                console.log('====================================');
               
        
            // console.log("Passwords Match");
            // res.json('Passwords Match');
        } else {
            // Passwords do not match
            res.status(422).json('Passwords do not match');
            console.log('====================================');
            console.log("Passwords don't match");
            console.log('====================================');
        }
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json('Internal Server Error');
    }
});

app.get('/profile', (req,res)=>{
   
   const {token} = req.cookies;
   
    if(token){
       
        try {
            const user = jsonToken.verify(token, jsonSecret);
            res.json(user);
            
          } catch (err) {
            // Handle the error here
            res.status(500).json({ error: 'Token verification failed' });
          }
       
    }
    else{
        res.json(null);
    }


    //res.json({token})
})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);
})


//////////////////////////////////////////////////





// app.get('/test', (req,res)=>{
//     res.json({"user": ["userOne", "userTwo", "userThree"]});
// })
app.listen(4000, ()=> console.log("Server started at port 4000"));
