import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PicturesComp from "../PicturesComp";
import AmenityComp from "../AmenityComp";
import VenueForm from "./VenueForm";
import Account from "./Account";

function Venues() {
  const { event } = useParams();
  const [venueData, setVenueData] = useState([])
  // console.log(event);


  useEffect(() => {
    try {
      
      axios
        .get("/myVenues")
        .then(({data}) => { //data comes is an object key which has an array of objects, so we are destructuring data first then setting the array to setVenueData as it is
          
          console.log(data)
          return setVenueData(data) 
        })
    } catch (error) {
      console.log(error)
    }
      
  }, []);

  return (
    <>
      {event !== "new" && (
        
          <>
         
            <Link
              className="inline-flex gap-1 items-center bg-purple-700 text-white py-2 m-4 px-6 rounded-full text-center text-xl font-bold"
              to={"/accPage/venues/new"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add a Venue
            </Link>
          <div className="m-6  flex flex-col items-start">
              <h1 className="text-4xl font-bold m-3 ">List of your all venues</h1>
              {
                venueData.map((data)=>{
                  return (
                     
                    // <div key={data._id} className=" text-2xl m-2 shadow-md rounded-md overflow-hidden bg-white flex flex-col items-start">
                    //   <br />
                    //   <Link to={`/accPage/venues/${data._id}`} className="m-2 flex flex-col ">
                      
                    //     {data.category}
                    //     <br />
                    //     {data.title} 
                        
                      

                    //   </Link>
                    //   {data.existingPhotos.length > 0 && 
                      
                    //   <div key={data} className='flex h-40 '>
                    //   <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className=' w-full rounded-2xl'/>
                    //   </div>
                      
                    // }
                    // </div>

                    <div className="card m-2  shadow-lg rounded-xl text-2xl" style={{ width: '18rem' }}>
  <img src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{data.title}</h5>
    <p className="card-text">{data.description}</p>
    <Link to={`/accPage/venues/new?id=${data._id}`} className="mt-2 btn bg-purple-700 text-white text-xl">{data.category}</Link>
  </div>
</div>
                    
                  )
                })
              }
             </div> 
          
          
            </>
      )}
      {event == "new" && (
        <div>
     

          <VenueForm />
        </div>
      )}
    </>
  );
}

export default Venues;
