import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';

 function Booking() {

const {user} = useContext(UserContext)

const [bookingsData, setBookingsData] = useState([])
const [loading, setLoading] = useState(false)






useEffect(  () => {
  
     axios.get(`/getBookings/${user.id}`).then((response=>{
//    console.log(response)
const{data} = response
if(data.length!=0){
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 1000);
}
 setBookingsData(data)
   console.log('res ok',data)
   
}))
  
}, [])

async function Cancel(id) {
  try {
    // Make the API call to cancel the booking
    await axios.delete(`/cancelBooking/${id}`);

    // Update the state to remove the canceled reservation
    setBookingsData((prevItems) => prevItems.filter((booking) => booking._id !== id));
  } catch (error) {
    console.error('Error canceling reservation:', error);
    // Handle error appropriately, e.g., show a notification to the user
  }
}

async function Approve(id){
try {
  const response = await axios.put(`/approveBooking/${id}`)
  setBookingsData((prevItems) =>
  prevItems.map((bookingItem) =>
    bookingItem._id == id ? { ...bookingItem, approval: true } : bookingItem
  )
);
  
  // setBookingsData((prevItems)=> prevItems.map((booking)=>{
  //   booking._id === id ? { ...booking, approval: true } : booking
  // }))
  
} catch (error) {
  
}
}

async function End(id){
  try {
     await axios.delete(`/endBooking/${id}`)
    setBookingsData((prevItems) => prevItems.filter((booking) => booking._id !== id));

  } catch (error) {
    console.log({error: 'Cannot end booking'})
  }
}
  

  return (
    <>
        <p className='text-center font-bold text-5xl my-4'>Your Bookings</p>
    {loading===true ? <p className='text-3xl flex justify-center'>Waiting for data retrieval...</p> : ( bookingsData && bookingsData.length > 0 ? bookingsData.map((booking)=> {
        return(
    <div key={booking._id} className='flex flex-col m-4'>
    <div className="card m-2  shadow-lg rounded-xl text-2xl bg-purple-700 text-white" >
  {/* <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." /> */}
  <div className="card-body">
    <h5 className="card-title">{booking.category}</h5>
    <p className="card-text">{booking.title}</p>
    <p className='card-text text-3xl '>{booking.Price}</p>
    { booking.approval == false ? 
    <div>
    <button className=' mt-8 bg-red-600 p-3 rounded-xl' onClick={()=> Cancel(booking._id)}>Cancel Reservation</button>
    <button className=' mt-8 bg-green-600 p-3 rounded-xl mx-3' onClick={()=>  {Approve(booking._id)}}>Approve Reservation</button>
    </div> : <button className='p-3 bg-gray-500 text-white' onClick={()=> End(booking._id)}>End This Booking</button>
    }
    {/* <Link to={`/accPage/venues/new?id=${data._id}`} className="mt-2 btn bg-purple-700 text-white text-xl">{data.category}</Link> */}
  </div>
</div>
</div>
        )
})

: (<p className='text-3xl flex justify-center'>No Bookings to show</p>)

)
    }
    </>
  )
}

export default Booking