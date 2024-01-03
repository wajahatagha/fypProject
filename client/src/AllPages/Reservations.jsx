import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function Reservations() {

const {user} = useContext(UserContext);
const [bookingData, setBookingData] = useState([])





useEffect(  () => {
  
     axios.get(`/getReservation/${user.id}`).then((response=>{
//    console.log(response)
const{data} = response
 setBookingData(data)
   console.log(bookingData)
 
}))
  
}, [])



  return (
    <>
        <p className='text-center font-bold text-5xl my-4'>Reservations</p>
    { bookingData.map((booking)=> {
        return(
    <div className='flex flex-col m-4'>
    <div className="card m-2  shadow-lg rounded-xl text-2xl bg-purple-700 text-white" >
  {/* <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." /> */}
  <div className="card-body">
    <h5 className="card-title">{booking.category}</h5>
    <p className="card-text">{booking.title}</p>
    <p className='card-text text-3xl '>{booking.Price}</p>
    <button className=' mt-8 bg-red-600 p-3 rounded-xl'>Cancel Reservation</button>
    {/* <Link to={`/accPage/venues/new?id=${data._id}`} className="mt-2 btn bg-purple-700 text-white text-xl">{data.category}</Link> */}
  </div>
</div>
</div>
        )
})
    }
    </>
  )
}
