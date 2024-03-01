import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function AdDetails() {
  
  const [ads, setAds] = useState([])
  const [priceCheck, setPriceCheck] = useState()
  const [ownerId, setOwnerId] = useState(null)
  const [title1, setTitle1] = useState('')
  const [category1, setCategory1] = useState('')
  const [approval, setApproval] = useState(false)
  const [bookingDone, setBookingDone] = useState(false)
  const [selectDate, setSelectDate] = useState(null)
  const [dayDate, setDayDate] = useState(new Date())
  const [nightDate, setNightDate] = useState(new Date())
  const [receivedDayArr, setReceivedDayArr] = useState([])
  const [receivedNightArr, setReceivedNightArr] = useState([])



  const [openCalender, setOpenCalender] = useState(false)
  const [shiftName, setShiftName] = useState(null)
  
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
      console.log('====================================');
      console.log('this is ad data',data.bookingDateDay, data.bookingNightDay);
      console.log('====================================');
      setReceivedDayArr(data.bookingDateDay);
      console.log('received arrayy',receivedDayArr);
      setReceivedNightArr(data.bookingNightDay);
      console.log('received night arrayy', receivedNightArr)
    
      return setAds([data])

      })


    }

console.log(selectDate)

  },[idFromQuery, selectDate])


  function handlePrice(event){
     setPriceCheck(event.target.value)
  }

  
  function booking(ev){
    ev.preventDefault();
    if(!priceCheck){
      return  alert('Choose Slot for Booking')
    }
    
    const sendData =  {
     id: idFromQuery, title1,priceCheck, category1, ownerId, dayDate, nightDate, approval
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
  
  function handleDateChange(date){
    
    const converted = date.toISOString().split('T')[0] 
    if(shiftName == 'day'){
      setDayDate(converted)
      setSelectDate(converted)
      console.log('this is day date', dayDate)
      console.log('this is night date', nightDate)
      setNightDate(null)
    }
    else if(shiftName == 'night'){
      setNightDate(converted)
      setDayDate(null)
      setSelectDate(converted)
      console.log('selecting night', nightDate)
    }
 
    setOpenCalender(false)
    
  }
  const handleCheckbox = (event) => {

    const {checked, value} = event.target
    setShiftName( checked?value :null ) 
    setOpenCalender(checked) 
    
  }

    function handleFilterDate(date){
      const datePicked = date.toISOString().split('T')[0]
      
      if (
        (!receivedDayArr || !receivedDayArr.includes(datePicked)) &&
        (!receivedNightArr || !receivedNightArr.includes(datePicked))
      ) {
        return true; // Return true to disable the date
      } else {
        return false; // Return false to enable the date
      }
      }


      return(
        <>
        {ads.map((item)=>{ 
          return(
            <form key={item._id} onSubmit={booking}>
    <div className="bg--100 p-4 ">
  {/* <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md grid grid-cols-2"> */}
    <h1 className="text-2xl font-bold mb-4">Venue Details</h1>

 <div className=''>
  
 
    <div className="flex flex-col gap-4">
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
        <p className="text-black font-semibold">{item.address}</p>
      </div>
      </div>

      <div className="">
        <p className="text-gray-600 font-bold text-xl">Description:</p>
        <p className="text-black">{item.description}</p>
      </div>

      <div className="">
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
      <div className="">
        <p className="text-gray-600 font-bold text-xl">Guests Capacity</p>
        <p className="mt-2 text-black text-xl">No. of people: {item.capacity}</p>
      </div>
      <div className="">
        <p className="text-gray-600 font-bold text-xl">Some Additional Information</p>
        <p className="mt-2 text-black text-xl">{item.addInfo}</p>
      </div>
     <div className='flex justify-between'> 
      <div>
        <p className="text-gray-600 font-bold text-xl">Booking duration for Day Package:</p>
        <p className="text-black font-semibold">{item.timeFrom}</p>
      </div>
      <div>
        <p className="text-gray-600 font-bold text-xl">Booking duration for Night Package:</p>
        <p className="text-black font-semibold">{item.timeTo}</p>
      </div>
      </div>
      <div className='flex m-8'>
      <div className='flex-col ml-16'>
        <label className='text-black text-xl font-bold'>Select booking date</label>
        <div className='flex gap-4 items-center'>
          <input 
          type='checkbox' 
          className='h-4 w-4'
          value={'day'}
          onChange={handleCheckbox}
          checked={shiftName == 'day'}
          />
          <label>Day Package</label>
        
          <input 
          type='checkbox' 
          className='h-4 w-4'
          value={'night'}
          onChange={handleCheckbox}
          checked={shiftName == 'night'}
          />
          <label>Night Package</label>
        
        </div>
        { openCalender && (
        <DatePicker open={true}  onChange={handleDateChange} selected={shiftName === 'day'
        ? dayDate
        : shiftName === 'night'
        ? nightDate
        : new Date()} 
        className='relative mb-4'
        filterDate={handleFilterDate}
        />
        )
        }
        {
          selectDate ? (
          
            <p className='p-2 text-lg font-bold'>Your Booking Date is {selectDate}</p>
          ) : (
            <p className='p-2 text-lg font-bold'>No date has been selected</p>
          )

        }
      </div>
      </div>
      <div className="flex justify-content mt-72 ">
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


</form>
        )})}

</>
    

      
      ) 
      
      }


