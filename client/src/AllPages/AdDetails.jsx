import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

export default function AdDetails() {
  
  const [ads, setAds] = useState([])
  
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');
  useEffect(()=>{

    if(idFromQuery){
      
      axios.put('/getAd/'+idFromQuery).then((response)=>{
      const {data} = response;
      // console.log('====================================');
      // console.log(data);
      // console.log('====================================');
      return setAds([data])

      })
    }



  },[idFromQuery])
  console.log('====================================');
  console.log(ads);
  console.log('====================================');
  
  // return (
  //   <>
  //   { ads.length >0 && ads.map((item)=>{
    
      return(
        <>
        {ads.map((item)=>{ 
          return(
    <div key={item._id} className="bg-gray-100 p-4">

  <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-4">Venue Details</h1>

    <div className="grid grid-cols-2 gap-4">
      <div>
      <div>
        <p className="text-gray-600">:</p>
        <p className="text-black font-semibold">{item.title}</p>
      </div>
      <div>
        
        <p className="text-black font-semibold">{item.category}</p>
      </div>
      {item.existingPhotos.map((image)=>{
        return (
        
        <div key={image} className=''>
        <img src={`http://127.0.0.1:4000/photoUploads/${image}`} className='w-100 h-44 my-3 rounded-xl ' />
        </div>
        )
      })}
      <div>
        <p className="text-gray-600 font-bold text-xl">Location:</p>
        <p className="text-black font-semibold">{item.location}</p>
      </div>

      </div>

      <div className="col-span-2">
        <p className="text-gray-600 font-bold text-xl">Description:</p>
        <p className="text-black">{item.description}</p>
      </div>

      <div className="col-span-2">
        <p className="text-gray-600 gap-2 font-bold text-xl">Amenities</p>
        {
          item.amenities.map((amenity)=>{
            return(
              <div key={amenity} className='text-lg'>
                <p>{amenity}</p>
              </div>
            )
          })
        }
        
      </div>
      <div className="col-span-2">
        <p className="text-gray-600 font-bold text-xl">Guests Capacity</p>
        <p className="mt-2 text-black text-xl">No. of people: {item.capacity}</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray-600 font-bold text-xl">Some Additional Information</p>
        <p className="mt-2 text-black text-xl">{item.addInfo}</p>
      </div>
      
      <div>
        <p className="text-gray-600 font-bold text-xl">Booking duration for Day Package:</p>
        <p className="text-black font-semibold">{item.timeFrom}</p>
      </div>
      <div>
        <p className="text-gray-600 font-bold text-xl">Booking duration for Night Package:</p>
        <p className="text-black font-semibold">{item.timeTo}</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray-600 text-2xl font-bold">Price on Day Time</p>
        <p className="m-3 text-black text-4xl font-bold">Rs. {item.dayPrice}</p>
      </div>
      <div className="col-span-2">
        <p className="text-gray-600 text-2xl font-bold">Price on Night Time</p>
        <p className="m-3 text-black text-4xl font-bold">Rs. {item.nightPrice}</p>
      </div>

    </div>

    <div className="mt-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Book Now</button>
    </div>
  </div>

</div>
        )})}

</>
    
//   })
// }
      
      ) 
      
      }


