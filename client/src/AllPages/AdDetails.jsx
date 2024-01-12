import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

export default function AdDetails() {
  
  const [ads, setAds] = useState([])
  const [priceCheck, setPriceCheck] = useState()
  const [ownerId, setOwnerId] = useState(null)
  const [title1, setTitle1] = useState('')
  const [category1, setCategory1] = useState('')
  const [approval, setApproval] = useState(false)
  const [bookingDone, setBookingDone] = useState(false)

  
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');

    const navigate = useNavigate()

  useEffect(()=>{

    if(idFromQuery){
      
      axios.put('/getAd/'+idFromQuery).then((response)=>{
      const {data} = response;
      setOwnerId(data.owner)
      setTitle1(data.title)
      setCategory1(data.category)
      // console.log('====================================');
      // console.log(data.owner);
      // console.log('====================================');
      console.log('====================================');
      console.log('this is ad data',data);
      console.log('====================================');
    //  setOwnerId(data.map(({owner})=>owner))
    //  console.log('this is owner', owner);
      return setAds([data])

      })
    }



  },[idFromQuery])
  // console.log('====================================');
  // console.log(ads);
  // console.log('====================================');
  

  function handlePrice(event){
     setPriceCheck(event.target.value)
  }

  function booking(ev){
    ev.preventDefault();
    const sendData =  {
      title1,priceCheck, category1, ownerId, approval
    }
   axios.post('/bookingReq', sendData).then((response)=>{
    const {data} = response;
    
    setBookingDone(true);
    console.log(data)
   })
  }

  if (bookingDone){
    navigate('/accPage/reservations')
  }

  // return (
  //   <>
  //   { ads.length >0 && ads.map((item)=>{
    
      return(
        <>
        {ads.map((item)=>{ 
          return(
            <form onSubmit={booking}>
    <div key={item._id} className="bg-gray-100 p-4 ">
  <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md grid grid-cols-2">
    <h1 className="text-2xl font-bold mb-4">Venue Details</h1>
<Link to={`/inbox/?id=${item.owner}`} className='flex justify-end items-center gap-2'>
  <span className='font-bold text-2xl'>Chat with Owner</span>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>

</Link>




 <div className='col-span-2 grid grid-cols-1'>
  
 
    <div className="grid grid-cols-2 gap-4">
      <div>
      <div>
      
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
      <div className='gap-2 mb-6'>
        <p className="text-gray-600 font-bold text-xl">Owner Name:</p>
        <p className="text-black font-semibold text-xl">{item.ownerName}</p>
      </div>
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
      <div className="col-2-span">
        <label className="text-gray-600 text-2xl font-bold flex">
          <input type='checkbox' checked={priceCheck == item.dayPrice} value={item.dayPrice} onChange={handlePrice} className='h-5 rounded-full'/>
          Price on Day Time</label>
        <p className="m-3 text-black text-4xl font-bold">Rs. {item.dayPrice}</p>
     
        <label className="text-gray-600 text-2xl font-bold flex">
          <input type='checkbox' checked={priceCheck == item.nightPrice} value={item.nightPrice} onChange={handlePrice} className='h-5 rounded-full'/>
          Price on Day Time</label>
        <p className="m-3 text-black text-4xl font-bold">Rs. {item.nightPrice}</p>
      </div>

    </div>

    <div className="mt-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" >Book Now</button>
    </div>
    </div>
  </div>

</div>
</form>
        )})}

</>
    
//   })
// }
      
      ) 
      
      }


