
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
      const bookingWithStatus = data.map((booking)=>{
        let status;
        if(booking.bookingDayDate){
        status = new Date(booking.bookingDayDate) < new Date() ? 'Stay Completed' : "Guests Are Arriving" 
        }
        else if(booking.bookingNightDate){
          status = new Date(booking.bookingNightDate) < new Date() ? 'Stay Completed' : "Guests Are Arriving" 
          }
          return {...booking,status}
      })
      setBookingsData(bookingWithStatus)
      // setBookingsData(data);
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
                // new Date(booking.bookingDayDate) > new Date() ? (
                //   <>
                //     <p>Status: Arriving</p>
                //   </>
                // ) : (
                //   <>
                //     {/* <p>Status: Stay Over</p> */}
                //     {/* <button
                //       className="p-3 bg-gray-500 text-white"
                //       onClick={() => End(booking._id)}
                //     >
                //       End This Booking
                //     </button> */}
                //   </>
                // ) 
                <>
                <div class="animate-pulse flex space-x-4">
                      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-700">
                
                          <p className="bg-gray-700 text-white p-2 rounded-2xl">
                            Status: {booking.status}
                          </p>
                        </div>
                      </div>
              </>
              // ) : new Date(booking.bookingNightDate) > new Date() ? (
              //   <>
              //     <p>Status: Arriving</p>
              //   </>
              ) : (
                <>
                  {/* <p>Status: Stay Over</p> */}
                  {/* <button
                    className="p-3 bg-gray-500 text-white"
                    onClick={() => End(booking._id)}
                  >
                    End This Booking
                  </button> */}
                    <div class="animate-pulse flex space-x-4">
                      <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto bg-gray-700">
                
                          <p className="bg-gray-700 text-white p-2 rounded-2xl">
                            Status: {booking.status}
                          </p>
                        </div>
                      </div>
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
