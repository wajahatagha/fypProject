// import React, { useContext, useEffect, useState } from 'react'

// import { UserContext } from '../UserContext';
// import axios from 'axios';

//  function Booking() {

// const {user} = useContext(UserContext)

// const [bookingsData, setBookingsData] = useState([])
// const [loading, setLoading] = useState(false)
// const [bookerName, setBookerName] = useState({})
// const [status, setStatus] = useState('')

// useEffect(  () => {

//     axios.get(`/getBookings/${user.id}`).then((response=>{
// //    console.log(response)
// const{data} = response
// if(data.length!=0){
//   setLoading(true)
//   setTimeout(() => {
//     setLoading(false)
//   }, 1000)

// }

//  setBookingsData(data)

//    console.log('res okk',bookingsData)

//    data.forEach( (booking)=>{
//    axios.post(`/getBooker`, {id: booking.userId}).then((response)=> {
//       const {data} = response;
//       setBookerName({
//         name: data.name,
//         email: data.email
//       })

//    })

//    })

// }))

// }, [])

// async function Cancel(id) {
//   try {
//     // Make the API call to cancel the booking
//     await axios.delete(`/cancelBooking/${id}`);

//     // Update the state to remove the canceled reservation
//     setBookingsData((prevItems) => prevItems.filter((booking) => booking._id !== id));
//   } catch (error) {
//     console.error('Error canceling reservation:', error);
//     // Handle error appropriately, e.g., show a notification to the user
//   }
// }

// async function Approve(id){
// try {
//   const response = await axios.put(`/approveBooking/${id}`)
//   setBookingsData((prevItems) =>
//   prevItems.map((bookingItem) =>
//     bookingItem._id == id ? { ...bookingItem, approval: true } : bookingItem
//   )

//   );
//   const {data} = response
//   const bookingDayDate = new Date(data.bookingDayDate).getTime()
//   const bookingNightDate = new Date(data.bookingNightDate).getTime()

//   if(bookingDayDate!==0){
//     if(bookingDayDate > new Date().getTime())
//     setStatus('Arriving')
//     else{
//       setStatus('Stay Completed')
//     }
//   }
//   else if(bookingNightDate!==0){
//     if(bookingNightDate > new Date().getTime())
//     setStatus('Arriving')
//     else{
//       setStatus('Stay Completed')
//     }
//   }

// } catch (error) {

// }
// }

// async function End(id){
//   try {
//      await axios.delete(`/endBooking/${id}`)
//     setBookingsData((prevItems) => prevItems.filter((booking) => booking._id !== id));

//   } catch (error) {
//     console.log({error: 'Cannot end booking'})
//   }
// }

//   return (
//     <>
//         <p className='text-center font-bold text-5xl my-4'>Your Bookings</p>
//     {loading===true ? <p className='text-3xl flex justify-center'>Waiting for data retrieval...</p> : ( bookingsData && bookingsData.length > 0 ? bookingsData.map((booking)=> {
//         return(
//     <div key={booking._id} className='flex flex-col m-4'>
//     <div className="card m-2  shadow-lg rounded-xl text-2xl bg-purple-700 text-white" >
//       <div className='flex mr-4'>
//   {/* <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." /> */}
//   <div className="card-body">
//     <h5 className="card-title">{booking.category}</h5>
//     <p className="card-text">{booking.title}</p>
//     <p className='card-text text-3xl '>{booking.Price}</p>

//     {
//       booking.bookingDayDate ? (
//         <>
//         <p className='card-text text-xl '>Booking Shift: Day Shift</p>
//         <p className='card-text text-xl '>Booking Date: {booking.bookingDayDate}</p>
//         </>
//       ) : (
//         <>
//         <p className='card-text text-xl '>Booking Shift: Night Shift</p>
//         <p className='card-text text-xl '>Booking Date: {booking.bookingNightDate}</p>
//         </>
//       )
//     }
//     <p className='card-text text-xl '>Booked By: {bookerName.name}</p>
//     <p className='card-text text-xl ml-28'>{bookerName.email}</p>

//     {/* <Link to={`/accPage/venues/new?id=${data._id}`} className="mt-2 btn bg-purple-700 text-white text-xl">{data.category}</Link> */}
//   </div>
//   <div className='ml-'>
//   { booking.approval == false ?
//     <div>
//     <button className=' mt-8 bg-red-600 p-3 rounded-xl' onClick={()=> Cancel(booking._id)}>Cancel Reservation</button>
//     <button className=' mt-8 bg-green-600 p-3 rounded-xl mx-3' onClick={()=>  {Approve(booking._id)}}>Approve Reservation</button>
//     </div> :

//      booking.bookingDayDate ?
//           (new Date(booking.bookingDayDate) > new Date()) ?
//           <>
//           <p>Status: Arriving</p>

//           </>
//           :<>
//           <p>Status: Stay Over</p>
//            <button className='p-3 bg-gray-500 text-white' onClick={()=> End(booking._id)}>End This Booking</button>
//            </>
//     : (new Date(booking.bookingDayDate) > new Date()) ?
//     <>
//     <p>Status: Arriving</p>

//     </>
//     :<>
//     <p>Status: Stay Over</p>
//     <button className='p-3 bg-gray-500 text-white' onClick={()=> End(booking._id)}>End This Booking</button>
//     </>
//     }

// </div>
// </div>
// </div>
// {/*  */}
// </div>
//         )
// })

// : (<p className='text-3xl flex justify-center'>No Bookings to show</p>)

// )
//     }
//     </>
//   )
// }

// export default Booking
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import "../bookings.css";

function Booking() {
  const { user } = useContext(UserContext);
  const [bookingsData, setBookingsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookerName, setBookerName] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios.get(`/getBookings/${user.id}`).then((response) => {
      const { data } = response;
      if (data.length !== 0) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
      setBookingsData(data);
      data.forEach((booking) => {
        axios.post(`/getBooker`, { id: booking.userId }).then((response) => {
          const { data } = response;
          setBookerName({
            name: data.name,
            email: data.email,
          });
        });
      });
    });
  }, []);

  async function Cancel(id) {
    try {
      await axios.delete(`/cancelBooking/${id}`);
      setBookingsData((prevItems) =>
        prevItems.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  }

  async function Approve(id) {
    try {
      const response = await axios.put(`/approveBooking/${id}`);
      setBookingsData((prevItems) =>
        prevItems.map((bookingItem) =>
          bookingItem._id === id
            ? { ...bookingItem, approval: true }
            : bookingItem
        )
      );
      const { data } = response;
      const bookingDayDate = new Date(data.bookingDayDate).getTime();
      const bookingNightDate = new Date(data.bookingNightDate).getTime();
      if (bookingDayDate !== 0) {
        if (bookingDayDate > new Date().getTime()) setStatus("Arriving");
        else setStatus("Stay Completed");
      } else if (bookingNightDate !== 0) {
        if (bookingNightDate > new Date().getTime()) setStatus("Arriving");
        else setStatus("Stay Completed");
      }
    } catch (error) {}
  }

  async function End(id) {
    try {
      await axios.delete(`/endBooking/${id}`);
      setBookingsData((prevItems) =>
        prevItems.filter((booking) => booking._id !== id)
      );
    } catch (error) {
      console.log({ error: "Cannot end booking" });
    }
  }

  return (
    <div className="booking-container">
      {" "}
      {/* Add class to the top-level container */}
      <p className="text-center font-bold text-5xl my-4">Your Bookings</p>
      {loading === true ? (
        <p className="text-3xl flex justify-center">
          Waiting for data retrieval...
        </p>
      ) : bookingsData && bookingsData.length > 0 ? (
        bookingsData.map((booking) => (
          <div key={booking._id} className="booking-card  shadow-lg rounded-xl">
            <div className="card-body">
              <h5 className="card-title">{booking.category}</h5>
              <p className="card-text">Title: {booking.title}</p>
              <p className="card-text text-3xl ">Price: {booking.Price}</p>
              {booking.bookingDayDate ? (
                <>
                  <p className="card-text text-xl ">Booking Shift: Day Shift</p>
                  <p className="card-text text-xl ">
                    Booking Date: {booking.bookingDayDate}
                  </p>
                </>
              ) : (
                <>
                  <p className="card-text text-xl ">
                    Booking Shift: Night Shift
                  </p>
                  <p className="card-text text-xl ">
                    Booking Date: {booking.bookingNightDate}
                  </p>
                </>
              )}
              <p className="card-text text-xl ">Booked By: {bookerName.name}</p>
              <p className="card-text text-xl ml-28">{bookerName.email}</p>
            </div>
            <div className="ml- status">
              {booking.approval == false ? (
                <div className="card-button">
                  <button
                    className="cancel"
                    onClick={() => Cancel(booking._id)}
                  >
                    Cancel Reservation
                  </button>
                  <button
                    className="approve"
                    onClick={() => {
                      Approve(booking._id);
                    }}
                  >
                    Approve Reservation
                  </button>
                </div>
              ) : booking.bookingDayDate ? (
                new Date(booking.bookingDayDate) > new Date() ? (
                  <>
                    <p>Status: Arriving</p>
                  </>
                ) : (
                  <>
                    <p>Status: Stay Over</p>
                    <button
                      className="p-3 bg-gray-500 text-white"
                      onClick={() => End(booking._id)}
                    >
                      End This Booking
                    </button>
                  </>
                )
              ) : new Date(booking.bookingNightDate) > new Date() ? (
                <>
                  <p>Status: Arriving</p>
                </>
              ) : (
                <>
                  <p>Status: Stay Over</p>
                  <button
                    className="p-3 bg-gray-500 text-white"
                    onClick={() => End(booking._id)}
                  >
                    End This Booking
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-3xl flex justify-center">No Bookings to show</p>
      )}
    </div>
  );
}

export default Booking;
