import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Ads() {
  const [ads, setAds] = useState([]);
  const [active, setActive] = useState('');
  
  const infoRef = useRef([])
  const [removeFilter, setRemoveFilter] = useState([])
  
  useEffect(() => {
    axios.get("/displayAds").then((response) => {
      const { data } = response;
      // console.log(data);
      infoRef.current = data;
      setRemoveFilter(data)
      return setAds(data);
    });
  }, []);
  console.log('====================================');
  console.log("remove filter",removeFilter);
  console.log('====================================');
  const categories = (type)=>{
    setActive(type)
    setAds([...infoRef.current.filter((item)=> item.category===type)])
  }

  const RemovingFilter = () =>{
    setActive('')
    return setAds(removeFilter)
  }

  return (
    <>
      <div className="flex pt-24 gap-12 pl-40 pb-16">
        <div
          className={
            active == "Farm"
              ? "bg-purple-700 text-white rounded-full text-2xl p-6 font-bold"
              : "text-2xl cursor-pointer p-6 font-bold"
          }
          onClick={() => {categories('Farm')}
        }
        >
          FarmHouses
        </div>
        <div
          className={
            active == "Beach Huts"
              ? "bg-purple-700 text-white rounded-full p-6 text-2xl font-bold"
              : "text-2xl cursor-pointer p-6 font-bold"
          }
          onClick={() => {categories('Beach Huts')}}
        >
          
          Beach Huts
        </div>
        <div
          className={
            active == "Wedding Halls"
              ? "bg-purple-700 text-white rounded-full p-6 text-2xl font-bold"
              : "text-2xl cursor-pointer p-6 font-bold"
          }
          onClick={() => {categories('Wedding Halls')}}
        >
          Wedding Halls
        </div>
        <div className="flex items-center text-xl font-bold p-2 ml-auto bg-gray-200 rounded-full cursor-pointer" onClick={RemovingFilter}>
          Show 
         All
         Venues
        </div>
      </div>
      <div className="flex flex-wrap justify-start pl-32 ">

        {ads.length > 0 &&
          ads.map((data) => {
            return (
              <div key={data._id} className="card m-4  shadow-lg rounded-xl text-xl w-80">
                <div className="relative ">
                  <img
                    src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`}
                    className="card-img-top rounded-xl w-full h-80"
                    alt="..."
                  />
                </div>
                <div className="card-body p-4">
                  <h5 className="card-title text-3xl font-semibold">
                    {data.title}
                  </h5>
                  <p className="card-text text-gray-600 text-xl">{data.address}</p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-sm text-gray-500 text-xl">{data.category}</p>
                    <Link
                      to={`ads/?id=${data._id}`}
                      className="btn btn-primary px-3 py-2 rounded-full text-lg font-semibold bg-purple-700 text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
         
      </div>
    </>
  );
}

export default Ads;
