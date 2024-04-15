// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import '../ads.css'
// import { Link } from "react-router-dom";

// function Ads() {
//   const [ads, setAds] = useState([]);
//   const [active, setActive] = useState('');
//   const [searchTitle, setSearchTitle] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [priceRange, setPriceRange] = useState('');
//   const infoRef = useRef([]);  //for creating mutable object
//   const [removeFilter, setRemoveFilter] = useState([]);
//   const [filterToggle, setFilterToggle] = useState(false)

//   useEffect(() => {
//     axios.get("/displayAds").then((response) => { //gets the data from endpoint .then(response) a promise handler works only if get works successfully
//       const { data } = response;
//       infoRef.current = data;
//       setRemoveFilter(data);
//       setAds(data);
//     });
//   }, []);

//   const categories = (type) => {
//     setActive(type);
//     setAds([...infoRef.current.filter((item) => item.category === type)]);
//   };

//   const filterByCapacity = () => {
//     setAds([...infoRef.current.filter((item) => item.capacity >= 100)]);
//   };

//   const filterByCapacity500 = () => {
//     setAds([...infoRef.current.filter((item) => item.capacity >= 500)]);
//   };

//   const filterByCapacity50 = () => {
//     setAds([...infoRef.current.filter((item) => item.capacity >= 50)]);
//   };

//   const filterByCapacity200 = () => {
//     setAds([...infoRef.current.filter((item) => item.capacity >= 200)]);
//   };

//   const handleSearch = () => {
//     setAds([...infoRef.current.filter((item) => item.title.toLowerCase().includes(searchTitle.toLowerCase()))]);
//   };

//   const filterByPriceRange = () => {
//     if (priceRange === '') {
//       setAds(infoRef.current);
//     } else {
//       const [min, max] = priceRange.split('-').map(Number);
//       setAds([...infoRef.current.filter((item) => item.dayPrice >= min && item.dayPrice <= max)]);
//     }
//   };

//   const filterByAddress = () => {
//     setAds([...infoRef.current.filter((item) => item.address.toLowerCase().includes(searchTerm.toLowerCase()))]);
//   };

//   const RemovingFilter = () => {
//     setActive('');
//     setAds(removeFilter);
//   };

//   return (
//     <>
//     <div className="flex flex-wrap justify-center">
//     <div className="container">
//     <div className="search-container">
//       <div className="search-name">
//         <input className="searchbox"
//           type="text"
//           placeholder="Search by title"
//           value={searchTitle}
//           onChange={(e) => setSearchTitle(e.target.value)}
//         />
//         <button className="search-buttons" onClick={handleSearch}>
//           Search
//         </button>
//       </div>

//       <div className="search-address">
//         <input className="searchbox"
//           type="text"
//           placeholder="Enter address..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <button className="search-buttons" onClick={filterByAddress}>
//           Search Address
//         </button>
//       </div>

//       <div className="price-filter">
//         <select className="drop-down"
//           value={priceRange}
//           onChange={(e) => setPriceRange(e.target.value)}
//         >
//           <option value="">Select Price Range</option>
//           <option value="20000-40000">20,000 - 40,000</option>
//           <option value="50000-100000">50,000 - 100,000</option>
//           <option value="100000-200000">100,000 - 200,000</option>
//           <option value="200000-250000">200,000 - 250,000</option>
//         </select>
//         <button className="drop-buttons" onClick={filterByPriceRange}>
//           Filter Price
//         </button>
//       </div>
//     </div>

//     <div className="category-buttons">
//       { 
//       !filterToggle ? 
//       <>
//       <button className="flex justify-center gap-2  px-36 py-3 bg-gray-200 rounded-2xl " onClick={()=> setFilterToggle(true)}>
//       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
// </svg>

//        Advanced Filter Search
//       </button>
//       </>
//       : 
//       <>
//       <div className={`button ${active === "Farm" ? "active" : ""}`} onClick={() => categories('Farm')}>
//         FarmHouses
//       </div>
//       <div className={`button ${active === "Beach Huts" ? "active" : ""}`} onClick={() => categories('Beach Huts')}>
//         Beach Huts
//       </div>
//       <div className={`button ${active === "Wedding Halls" ? "active" : ""}`} onClick={() => categories('Wedding Halls')}>
//         Wedding Halls
//       </div>
//       <div className={`button ${active === "Capacity 100+" ? "active" : ""}`} onClick={filterByCapacity50}>
//         Capacity 50+
//       </div>
//       <div className={`button ${active === "Capacity 100+" ? "active" : ""}`} onClick={filterByCapacity}>
//         Capacity 100+
//       </div>
//       <div className={`button ${active === "Capacity 100+" ? "active" : ""}`} onClick={filterByCapacity200}>
//         Capacity 200+
//       </div>
//       <div className={`button ${active === "Capacity 500+" ? "active" : ""}`} onClick={filterByCapacity500}>
//         Capacity 500+
//       </div>

//       <div className="button" onClick={RemovingFilter}>
//         All Venues
//       </div>
//       </>
//       }
    
//     </div>





    
//   </div>
//     </div>
//     <div className="flex flex-wrap ">
//       {ads.length > 0 &&
//         ads.map((data) => (
//           <div key={data._id} className="card m-4 shadow-lg rounded-xl text-xl w-80">
//             <div className="relative">
//               <img
//                 src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`}
//                 className="card-img-top rounded-xl w-80 h-80"
//                 alt="..."
//               />
//             </div>
//             <div className="card-body p-4">
//               <h5 className="card-title text-3xl font-semibold">{data.title}</h5>
//               <p className="card-text text-gray-600 text-xl">{data.address}</p>
//               <div className="flex items-center justify-between mt-4">
//                 <p className="text-sm text-gray-500 text-xl">{data.category}</p>
//                 <Link
//                   to={`ads/?id=${data._id}`}
//                   className="btn btn-primary px-3 py-2 rounded-full text-lg font-semibold bg-purple-700 text-white"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//     </div>
//     </>
//   );
// }

// export default Ads;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import '../ads.css'
import { Link } from "react-router-dom";

function Ads() {
  const [ads, setAds] = useState([]);
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const infoRef = useRef([]);  //for creating mutable object
  const [removeFilter, setRemoveFilter] = useState([]);
  const [filterToggle, setFilterToggle] = useState(false)

  useEffect(() => {
    axios.get("/displayAds").then((response) => {
      const { data } = response;
      infoRef.current = data;
      setRemoveFilter(data);
      setAds(data);
    });
  }, []);

  const categories = (type) => {
    setActiveCategory(type);
  };

  const handleCapacityInput = () => {
    if (selectedCapacity !== '') {
      filterAds();
    } else {
      return;
    }
  };

  const filterAds = () => {
    let filteredAds = infoRef.current;
    if (activeCategory !== '') {
      filteredAds = filteredAds.filter((item) => item.category === activeCategory);
    }
    if (selectedCapacity !== '') {
      filteredAds = filteredAds.filter((item) => item.capacity >= parseInt(selectedCapacity));
    }
    setAds(filteredAds);
  };

  const handleSearch = () => {
    setAds([...infoRef.current.filter((item) => item.title.toLowerCase().includes(searchTitle.toLowerCase()))]);
  };

  const filterByPriceRange = () => {
    if (priceRange === '') {
      setAds(infoRef.current);
    } else {
      const [min, max] = priceRange.split('-').map(Number);
      setAds([...infoRef.current.filter((item) => item.dayPrice >= min && item.dayPrice <= max)]);
    }
  };

  const filterByAddress = () => {
    setAds([...infoRef.current.filter((item) => item.address.toLowerCase().includes(searchTerm.toLowerCase()))]);
  };

  const RemovingFilter = () => {
    setActiveCategory('');
    setSelectedCapacity('');
    setAds(removeFilter);
    setFilterToggle(false)
  };

  return (
    <>
    <div className="flex flex-wrap justify-center">
    <div className="container">
    <div className="search-container">
      <div className="search-name">
        <input className="searchbox"
          type="text"
          placeholder="Search by title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <button className="search-buttons" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="search-address">
        <input className="searchbox"
          type="text"
          placeholder="Enter address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-buttons" onClick={filterByAddress}>
          Search Address
        </button>
      </div>

      <div className="price-filter">
        <select className="drop-down"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="">Select Price Range</option>
          <option value="20000-40000">20,000 - 40,000</option>
          <option value="50000-100000">50,000 - 100,000</option>
          <option value="100000-200000">100,000 - 200,000</option>
          <option value="200000-250000">200,000 - 250,000</option>
        </select>
        <button className="drop-buttons" onClick={filterByPriceRange}>
          Filter Price
        </button>
      </div>
    </div>

    <div className="category-buttons">
    {

      !filterToggle ? 
      <>
    <button className="flex justify-center gap-2  px-36 py-3 bg-gray-200 rounded-2xl " onClick={()=> setFilterToggle(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
 </svg>

        Advanced Filter Search
       </button>
</> 
: <>
    <div className="flex items-center font-bold text-3xl my-16 "> Choose Category
      <div className={`button ${activeCategory === "Farm" ? "active" : ""}`} onClick={() => 
        {
        categories('Farm')
       
      }
        }>
        FarmHouses
      </div>

      <div className={`button ${activeCategory === "Beach Huts" ? "active" : ""}`} onClick={() => categories('Beach Huts')}>
        Beach Huts
      </div>
      <div className={`button ${activeCategory === "Wedding Halls" ? "active" : ""}`} onClick={() => categories('Wedding Halls')}>
        Wedding Halls
      </div>
      </div> 

      </>


      }

    </div>

    {activeCategory && (
      <div className="flex flex-col gap-4 mt-5 ">
        
        <input
          type="number"
          className="w-full py-2 border rounded-full pl-8  "
          placeholder="Enter capacity"
          value={selectedCapacity}
          onChange={(e) => setSelectedCapacity(e.target.value)}
        />
        <button className="bg-purple-700 text-white font-bold text-xl p-2 rounded-xl" onClick={handleCapacityInput}>Apply Filter</button>
      </div>
    )}

    <div className="button" onClick={RemovingFilter}>
      All Venues
    </div>

  </div>
    </div>
    <div className="flex flex-wrap ">
      {ads.length > 0 &&
        ads.map((data) => (
          <div key={data._id} className="card m-4 shadow-lg rounded-xl text-xl w-80">
            <div className="relative">
              <img
                src={`http://127.0.0.1:4000/photoUploads/${data.existingPhotos[0]}`}
                className="card-img-top rounded-xl w-80 h-80"
                alt="..."
              />
            </div>
            <div className="card-body p-4">
              <h5 className="card-title text-3xl font-semibold">{data.title}</h5>
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
        ))}
    </div>
    </>
  );
}

export default Ads;


