import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext';
import axios from 'axios';

 function Reservations() {

const {user} = useContext(UserContext);
const [bookingData, setBookingData] = useState([])
const [loading, setLoading] = useState(false)





useEffect(  () => {
  
     axios.get(`/getReservation/${user.id}`).then((response=>{
//    console.log(response)
const{data} = response
 setBookingData(data)
 if(data.length!=0){
  setLoading(true)
  setTimeout(() => {
    setLoading(false)
  }, 1000);
}
   console.log(bookingData)
 
}))
  
}, [])

async function Cancel(id){

 try {
  axios.delete(`/cancelReservation${id}`)
  setBookingData((prev)=>{
    prev.filter((reserves)=> reserves._id!==id )
  })
 } catch (error) {
  console.log('Cannot cancel reservation', error)
 }


}


  return (
    <>
        <p className='text-center font-bold text-5xl my-4'>Reservations</p>
    {loading===true ? <p className='text-3xl flex text-center'>Waiting for data retrieval...</p> : bookingData.map((booking)=> {
        return( 
    <div key={booking._id} className='flex flex-col m-4'>
    <div className="card m-2  shadow-lg rounded-xl text-2xl bg-purple-700 text-white" >
  {/* <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." /> */}
  <div className="card-body">
    <h5 className="card-title">{booking.category}</h5>
    <p className="card-text">{booking.title}</p>
    <p className='card-text text-3xl '>{booking.Price}</p>
    <button className=' mt-8 bg-red-600 p-3 rounded-xl' onClick={()=> Cancel(booking._id) }>Cancel Reservation</button>
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
export default Reservations