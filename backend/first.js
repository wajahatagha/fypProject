

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
    origin:'http://localhost:5173'
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
        const time = { expiresIn: '5h' };
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

  app.get('/getMyBookedDates/:id', async (req,res)=>{
    const {id} = req.params;
    const venue = await Venue.findById(id)

    res.status(200).json({dayArray: venue.bookingDateDay, nightArray: venue.bookingDateNight})
  })

  app.post('/blockDates', async (req,res)=>{
    const {id, day, night} = req.body;
    console.log('idd',id)

    day.forEach(element => {
       element  = new Date(element)
       element.setDate(element.getDate() - 1)
       element.toISOString().split('T')[0]

    });

    console.log('blocking day', day)
    try {
        
       const dayUpdate = await Venue.findByIdAndUpdate(id, { $addToSet: { bookingDateDay: { $each: day } } });
    
            // Update bookingDateNight array
       const nightUpdate = await Venue.findByIdAndUpdate(id, { $addToSet: { bookingDateNight: { $each: night } } });
        console.log('successfully blocked',  nightUpdate)
        res.status(200).json(dayUpdate)
    } catch (error) {
        console.log('error in getting dates blocked')
        res.status(400).json("Error in Blocking")
    }

    
    
  })
  

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


app.post('/bookingReq', async (req,res)=>{
    const {id, title1, priceCheck, category1, ownerId, dayDate, nightDate, approval} = req.body; 
   
    const {token} = req.cookies;
    const user = jsonToken.verify(token, jsonSecret)
    console.log("Day date", dayDate)
    console.log("Night date", nightDate)
    if(dayDate!=null){
        const newDayDate = new Date(dayDate) 
        newDayDate.setDate(newDayDate.getDate())
        const finalDayDate = newDayDate.toISOString().split('T')[0]

        console.log('final day date', finalDayDate)

        try {
            if (user){
                const bookingDetail = await Booking.create({
                  venueId:id,  ownerId: ownerId, userId: user.id, Price:priceCheck, title:title1, category:category1, bookingDayDate:dayDate, bookingNightDate:nightDate, approval:approval 
                })
        
                // console.log('your booking',bookingDetail)
               const vUpdate = await Venue.findByIdAndUpdate(id, {
                $addToSet: {
                    bookingDateDay: finalDayDate,
                    bookingDateNight: nightDate
                }
                })
                console.log('Your venue', vUpdate)
                res.status(200).json(bookingDetail)
            }
            else{
                res.status(400).json('User Not Found') 
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Server Error'})
        }
    }
    else if(nightDate!=null){
        const newNightDate = new Date(nightDate)
        newNightDate.setDate(newNightDate.getDate() )
        const finalNightDate = newNightDate.toISOString().split('T')[0]
        try {
            if (user){
                const bookingDetail = await Booking.create({
                  venueId:id,  ownerId: ownerId, userId: user.id, Price:priceCheck, title:title1, category:category1, bookingDayDate:dayDate, bookingNightDate:nightDate, approval:approval 
                })
        
                // console.log('your booking',bookingDetail)
               const vUpdate = await Venue.findByIdAndUpdate(id, {
                $addToSet: {
                    bookingDateDay: dayDate,
                    bookingDateNight: finalNightDate
                }
                })
                console.log('Your venue', vUpdate)
                res.status(200).json(bookingDetail)
            }
            else{
                res.status(400).json('User Not Found') 
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error:'Server Error'})
        }
    }



    

})

app.get('/getReservation/:id', async (req,res)=>{
    const {id} = req.params;
    console.log(id)
    

    try {
        if(id){
            const details = await Booking.find({userId:id})
            // console.log(details)
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

app.post('/getBooker', async (req,res)=>{
    const {id} = req.body;
    // console.log('bookerId',req.body)

    const booker = await User.findById(id)

    console.log('this is booker', booker)

    res.status(200).send(booker)


})

// app.post('/sendContactInfo', getBill,(req,res)=>{
    
// })

app.delete('/cancelBooking/:id',async (req,res)=>{
    const {id} = req.params
    console.log(id)

    try {
        const finding = await Booking.findById(id)
        const {venueId, bookingDayDate, bookingNightDate} = finding
        await Venue.findByIdAndUpdate(venueId,  {
            $pull: {
                bookingDateDay: { $in:  [bookingDayDate] }, // Remove the dayDate from bookingDateDay array
                bookingDateNight: { $in: [bookingNightDate] } // Remove the nightDate from bookingDateNight array
            }
           })
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
    const deleting = await Booking.findById(id)
    console.log('finding',deleting)

   const {venueId, bookingDayDate, bookingNightDate} = deleting
   
  const removing =   await Booking.findByIdAndRemove(id)
    console.log('removing',removing)
  const updating = await Venue.findByIdAndUpdate(venueId, {
    $pull: {
        bookingDateDay: { $in:  [bookingDayDate] }, // Remove the dayDate from bookingDateDay array
        bookingDateNight: { $in: [bookingNightDate] } // Remove the nightDate from bookingDateNight array
    }
   })
   console.log('your venueeee',updating)
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

//ADMIN APIS

// app.get('/adminVenues', async (req,res)=>{
    
//     try {
//         const venues = await Venue.find()
//         const bookings = await Booking.find()

//         const info = {
//             venueData: venues,
//             bookingdata: bookings
//         }
//         console.log('admin venues', venues)
//         res.status(200).send(info)
//     } catch (error) {
//         res.status(400).send(error).json('error')
//     }
    
// })

app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1, password: 1 }); // Fetching only name, email, and password fields
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndRemove(id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete user' });
    }
});

app.get('/adminVenues', async (req, res) => {
    try {
      const venues = await Venue.find();
      res.json(venues);
    } catch (error) {
      console.error('Error fetching venues:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/adminVenues/:id', async (req, res) => {
    try {
      const deletedVenue = await Venue.findByIdAndDelete(req.params.id);
      if (!deletedVenue) {
        return res.status(404).json({ message: 'Venue not found' });
      }
      res.status(200).json({ message: 'Venue deleted successfully', deletedVenue });
    } catch (error) {
      console.error('Error deleting venue:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/adminBookings', async (req, res) => {
    try {
      const bookings = await Booking.find();
      res.status(200).json(bookings);
      console.log(bookings);
    } catch (error) {
      console.error('Error getting bookings:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.delete('/adminBookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id); // Find and delete the booking by ID
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error('Error deleting booking:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response
    }
});




app.post('/adminLogout', (req,res)=>{
    res.cookie('token', '').json(true);

})


app.listen(4000, ()=> console.log("Server started at port 4000"));






        
        


