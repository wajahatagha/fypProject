//npm init -y installs package.json file
//to execute application, we need 2 things, route and app.listen()

const express = require('express') 
const cors = require('cors');
const { default: mongoose } = require('mongoose');//mongoose is the driver used to access NoSQL database through schema
//MongoDB provides NoSQL architecture and it doesn't access data through schema but through mongoose we can do it.
require('dotenv').config()
const User = require('./dataModels/User.js')
const Venue = require('./dataModels/Venue.js')
const Booking = require('./dataModels/Booking.js')
const bcrypt = require('bcryptjs')
const jsonToken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDl = require('image-downloader')//this is a middleware for downloading photos using a link in backend folder
const multer = require('multer') //multer is a middleware
const fy = require('fs');
const { log, info } = require('console');
const path = require('path');
const ws =require('ws')

const jsonSecret = 'asbcnkvjnaknvka'

//app.use is used to handle middleware functionss
//through middleware functions app can use their functionality while passing through req res streams



const app = express(); //app object calling express constructor enabling express functionality in the app
app.use(cookieParser()) //this middleware is used to read cookie which contains the token
app.use(express.json()) //middleware used so that the request comes over here to parse the string data in the json format
app.use('/photoUploads', express.static(__dirname+'/photoUploads')) //*****NEED TO UNDERSTAND THIS LINE */

app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173'
}))

app.get('/run', (req,res)=> { //in get method, parameters are passed by binding them into URL
    res.json('running'); 
})

const secretSalt = bcrypt.genSaltSync(12)

mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req,res) =>{
    res.json('test ok');
})
    


// console.log(process.env.MONGO_URL)

app.post('/signup', async (req,res)=>{ //in post method, parameters are binded with the page headers and then set
    const {name,email,password} = req.body 
    try {
        const userDetails = await User.create({
            name,
            email,
            password:bcrypt.hashSync(password,secretSalt),
        })
       
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
      
        console.log("I am user",userDetails);
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
                console.log(token);
                res.cookie('token', token);
                res.json({ id: userDetails._id,
                    name: userDetails.name,
                    email: userDetails.email });

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
            const {name,email,id} = jsonToken.verify(token, jsonSecret)
            // , async (userr)=>{

            //     const {name,email,_id} = await User.findOne({email}) 
                console.log("console rocks",name,email,id);
            // })
            res.json({name,email,id});

            
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

// console.log('====================================');
// console.log({__dirname});sgsdg
// console.log('====================================');

app.post('/photo-link', async (req,res)=>{
    const {link} = req.body;
    const add = 'picture' + Date.now() ; //if we write only .jpg here then it won't work, name is required with extensions
    const options = ({
        url: link,
        dest: __dirname + "/photoUploads/" + add, //if we write /photoUploads then it will save in __dirname and the rest will assum as name of photo
        extractFilename: false
    })
    await imageDl.image(options)
    res.json(add)
    console.log(options.dest);
})


const multerData = multer({dest:'photoUploads'}); //intercepts incoming req before coming to route handler, processes and adds file info in req.files 
app.post('/uploading',multerData.array('pictures',100),(req,res)=> {//multerData.array specifies that you expect multiple files to be uploaded and indicates the name of the field(which is 'pictures' in this case) in the form that contains files.

    //  const {files} = req.files; //req.body only contains field infos of form typically text, not fileskdkd
     console.log("this is request ",req.files);
     const newArray = []
    for (let i = 0; i < req.files.length; i++){
        const{path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        fy.renameSync(path,newPath)
        newArray.push(newPath.replace('photoUploads\\' , ''))
    }
    res.json(newArray) //req.files contains info about the files. 
     
   
    // const newArray = []
    // for (let i = 0; i < req.files.length; i++) {
    //     const {path,originalname} = req.files[i];
    //     const prts = originalname.split('.')
    //     const ext = prts[prts.length - 1]
    //     const updatePath = path + '.' + ext 
    //     fy.renameSync(path,updatePath)
    //     newArray.push(updatePath.replace('photoUploads\\' , ''))
        
        
    // }


})

app.post('/editProfile',async (req,res)=>{
    
    const{name1,password1} = req.body
    const {token} = req.cookies;

    //
    try {
        const {id} = jsonToken.verify(token, jsonSecret)
        const user = await User.findById(id)

        if(!user){
            return res.json("user isn't there")
        }

        if(name1){
            user.name = name1
        }

        if(password1){
            const newPw = bcrypt.hashSync(password1,secretSalt)
            user.password = newPw;
        }
        //
        
        const newToken = jsonToken.sign(
            {
              name: user.name,
              email: user.email,
              id: user._id,
            },
           jsonSecret, 
             
          );
        await user.save();

          
      
          res.cookie('token', newToken); 
      
          res.json({
            id: user._id,
            name: user.name,
            email: user.email,
          });
        } catch (error) {
          console.error('Error updating profile:', error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
      



app.post('/createMyVenue', async (req,res)=>{
    const {info} = req.body
    const {category,title, address, description, amenities, existingPhotos, addInfo, timeFrom,
        timeTo, capacity, dayPrice, nightPrice} = info;
    const {token} = req.cookies;
    // console.log("this is title",title); 
    try {
        
        const {id,name} = jsonToken.verify(token, jsonSecret)
       const venueDetails = await Venue.create({
            owner:id,
            ownerName:name,
            category, title, address, description, amenities, existingPhotos, addInfo, timeFrom,
        timeTo, capacity, dayPrice, nightPrice
    
        })
        res.json(venueDetails);
        // console.log("This is venue", venueDetails);
    } catch (e) {
        res.status(400).json({e:'Error in adding venue'});
        console.log("Error in venue form");
    }
 

})

app.get('/myVenues', async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            // If there is no token provided in the request, respond with an error
            return res.status(401).json({ error: 'Token is missing' });
        }

        const { id } = jsonToken.verify(token, jsonSecret);

        const venue = await Venue.find({ owner: id });

        if (venue.length > 0) {
            res.status(200).json(venue);
        } else {
            res.status(404).json({ error: 'No venues found for the user' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error processing the request' });
    }
});


app.get('/getMyVenue/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const vDetail = await Venue.findById(id);
  
      if (!vDetail) {
        // Log that the venue was not found
        console.log(`Venue not found for ID: ${id}`);
        return res.status(404).json({ error: 'Venue not found' });
      }
  
      // Log the successful retrieval of venue details
      console.log(`Venue details retrieved for ID: ${id}`);
      return res.json(vDetail);
    } catch (error) {
      console.error('Error fetching venue details:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

app.put('/updateMyVenue/:id',async (req,res)=>{
    const {id} = req.params
   // console.log("this is id",id); 

    const {info} = req.body

    const {
        category,title, address, description, amenities, existingPhotos, addInfo, timeFrom,
timeTo, capacity, dayPrice, nightPrice
    } = info;
    

        // console.log('this is info',info);
        const {token} = req.cookies;
        
        const userDoc = jsonToken.verify(token, jsonSecret)
        
        
        const venueDoc = await Venue.findById(id)
        console.log(userDoc.id);;
        try {
            
            if(venueDoc.owner.toString() == userDoc.id){ //venueDoc.owner byy default returnss id in the form of ObjectId(id) so we have to convert it into string
                
                
                venueDoc.set({
                    category,title, address, description, amenities, existingPhotos, addInfo, timeFrom,
            timeTo, capacity, dayPrice, nightPrice
                })
    
               await venueDoc.save()
                res.status(200).json('Venue Updated')
            }

        } catch (error) {
            res.status(400).json({error:'error in updating venue'})
        }


})

app.get('/displayAds', async (req,res)=>{

    try {
        
        const ad = await Venue.find();
        res.status(200).json(ad)
        
    } catch (error) {
        res.status(400).json(error);
    }

})

app.put('/getAd/:id', async (req,res)=>{

    const {id} = req.params;
    console.log('====================================');
    console.log("getting add",id);
    console.log('====================================');
    try {
        if(id){
            const ad = await Venue.findById(id)
            console.log(ad)
            res.status(200).json(ad)
        }
        
    } catch (error) {
        res.status(400).json("Cannot fetch ad data", error)
    }

})

app.post('/logout', (req,res)=>{
    res.cookie('token', '').json(true);

})


//////////////////////////////////////////////////





// app.get('/test', (req,res)=>{
//     res.json({"user": ["userOne", "userTwo", "userThree"]});
// })

app.put('/getOwner/:id', async (req,res)=>{
    const {id} = req.params;
    try {
        if(id){
            const userDoc = await User.findById(id)
            res.status(200).json(userDoc)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

app.post('/bookingReq', async (req,res)=>{
    const {title1, priceCheck, category1, ownerId, approval} = req.body; 
   

    const {token} = req.cookies;
    const user = jsonToken.verify(token, jsonSecret)
    console.log(user)
    try {
        if (user){
            const bookingDetail = await Booking.create({
                ownerId: ownerId, userId: user.id, Price:priceCheck, title:title1, category:category1, approval:approval 
            })
    
            console.log(bookingDetail)
            res.status(200).json(bookingDetail)
        }
        else{
            res.status(400).json('User Not Found')
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Server Error'})
    }
})

app.get('/getReservation/:id', async (req,res)=>{
    const {id} = req.params;
    console.log(id)

    try {
        if(id){
            const details = await Booking.find({userId:id})
            console.log(details)
            res.status(200).json(details)
        }
        

    } catch (error) {
        res.status(400).json({error:'Server Error'})
    }
})




app.listen(4000, ()=> console.log("Server started at port 4000"));





// const webSoc = new ws.WebSocketServer({server})

// webSoc.on('connection',async (connection,req)=>{ //this connection is between our server and one specific client 
// console.log('====================================');
// console.log('connected');
// console.log('====================================');
// // const cookie = req.headers.cookie;
// // const queryParameters = url.parse(req.url, true).query;
// //   const owner = queryParameters.id;
// //   const ownerDoc = await User.findById(owner)
// //   console.log(ownerDoc.name)
// //   console.log(owner)
//   if (cookie) {
//     const token = cookie.split('=')[1];

//     try {
//       const userDoc = jsonToken.verify(token, jsonSecret);

//       const { id, name } = userDoc;

//       connection.id = id;
//       connection.name = name;
//     }
//     catch (error) {
//               console.error('Error verifying token:', error);
//             }
//         }
//        console.log('====================================');
//        webSoc.clients.forEach(client => {    //we use forEach and not map bec it does not create a new array when executing a function on each element
//         // Broadcast the array of client names to all connected clients
//         client.send(JSON.stringify({ active:[...webSoc.clients].map(c =>( {id:c.id,name:c.name} ))}));
//         //JSON.Stringify is used to convert JS object into string to the client 
//         //data is sent typically as string bec websocket msgs support text frames
//     });
        
        
//        console.log('====================================');
// }
// )


