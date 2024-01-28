

const express = require('express') 
const cors = require('cors');
const { default: mongoose } = require('mongoose');

require('dotenv').config()
const User = require('./dataModels/User.js')
const Venue = require('./dataModels/Venue.js')
const Booking = require('./dataModels/Booking.js')
const bcrypt = require('bcryptjs')
const jsonToken = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer') 
const fy = require('fs');


const jsonSecret = 'asbcnkvjnaknvka'

const app = express(); 
app.use(cookieParser()) 
app.use(express.json()) 
app.use('/photoUploads', express.static(__dirname+'/photoUploads')) 

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
        const time = { expiresIn: '1h' };
               const token =  jsonToken.sign({name:userDetails.name,email:userDetails.email,id:userDetails._id,password:userDetails.password},jsonSecret,time)
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
            res.json({name,email,id});

            
          } catch (err) {
            // Handle the error here
            res.status(400).json({ error: 'Token verification failed' });
          }
       
    }
    else{
        res.json(null);
    }


  
})






const multerData = multer({dest:'photoUploads'}); 
app.post('/uploading',multerData.array('pictures',100),(req,res)=> {

    //  const {files} = req.files; //req.body only contains field infos of form typically text, not fileskdkd
     console.log("this is request ",req.files)
     
     const newArray = []
    for (let i = 0; i < req.files.length; i++){
        const{path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        fy.renameSync(path,newPath)
        newArray.push(newPath.replace('photoUploads\\' , ''))
    }
    console.log(newArray)
    res.json(newArray) 
   


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
    // console.log(category,title,address,description,amenities,existingPhotos,addInfo,timeFrom,timeTo,capacity,dayPrice,nightPrice)
    try {
        
        const {id,name} = jsonToken.verify(token, jsonSecret)
        
       const venueDetails = await Venue.create({
            owner:id,
            ownerName:name,
            category, title, address, description, amenities, existingPhotos, addInfo, timeFrom,
        timeTo, capacity, dayPrice, nightPrice
    
        })
        res.status(200).json(venueDetails);
         console.log("This is venue", venueDetails);
    } catch (e) {
        res.status(400).json({e:'Error in adding venue'});
        console.log(e);
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

app.delete('/deleteVenue/:id',async (req,res)=>{
    const {id} = req.params; 
    try {
        
        const deleted = await Venue.findByIdAndRemove(id)
        res.status(200).json(deleted)
    } catch (error) {
        res.status(400).json('deletion unsuccessful')
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

// app.put('/getOwner/:id', async (req,res)=>{
//     const {id} = req.params;
//     try {
//         if(id){
//             const userDoc = await User.findById(id)
//             res.status(200).json(userDoc)
//         }
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })

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
app.get('/getBookings/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const ownerData = await Booking.find({ownerId:id})
        if(ownerData){
            res.status(200).json(ownerData)
        }
    } catch (error) {
        res.status(400).json({error:'server error'})   
    }
})

// app.post('/sendContactInfo', getBill,(req,res)=>{
    
// })

app.delete('/cancelBooking/:id',async (req,res)=>{
    const {id} = req.params
    console.log(id)

    try {
        const deleting = await Booking.findByIdAndRemove(id)
        console.log(deleting)

        res.status(200).json('Booking deleted')

    } catch (error) {
        res.status(400).json('Deletion unsuccessful')
    }

})

app.delete('/endBooking/:id', async (req,res)=>{
 const {id} = req.params;

 try {
    const deleting = await Booking.findByIdAndRemove(id)
    console.log(deleting)
    res.status(200).json('Booking has Ended')
 } catch (error) {
    res.status(400).json('Cannot end Booking')
 }
})

app.delete('/cancelReservation/:id', async (req,res)=>{
const {id} = req.params 

console.log(id)    

try {
    const deleting = await Booking.findByIdAndRemove(id)
    console.log(deleting)

    res.status(200).json('Booking deleted')

} catch (error) {
    res.status(400).json('Deletion unsuccessful')
}


})

app.put('/approveBooking/:id',async (req,res)=>{
    const {id} = req.params
    console.log('booking id',id)
    try {
        
        const bookings = await Booking.findById(id) 
    
        if(!bookings){
            res.status(400).json({message: 'Could not find Booking'})
        }
    
        bookings.approval = true;
    
        bookings.save();
        res.status(200).json(bookings)
    }
     catch (error) {
        res.status(500).json({error:'Internal Server Error'})

}

})


app.listen(4000, ()=> console.log("Server started at port 4000"));






        
        


