import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../UserContext';

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
  const [dateToggle, setDateToggle] = useState(false)
  const [receivedDayArr, setReceivedDayArr] = useState([])
  const [receivedNightArr, setReceivedNightArr] = useState([])
  const {user} = useContext(UserContext)
  


  const [openCalender, setOpenCalender] = useState(false)
  const [shiftName, setShiftName] = useState(null)
  const [shiftToggle, setShiftToggle] = useState(false)



  
  const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');

    const navigate = useNavigate()

    let increasedDate = ''

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
      setReceivedNightArr(data.bookingDateNight);
      console.log('received night arrayy', receivedNightArr)
    
      return setAds([data])

      })


    }



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
    if(user){
    axios.post('/bookingReq', sendData).then((response)=>{
      const {data} = response;
      
      setBookingDone(true);
      console.log(data)
    })
  }
  else{
    navigate('/logging') 
  }
  }
  
  if (bookingDone){
    navigate('/accPage/reservations')
  }
  
  function handleDateChange(date){
    
       
    if(shiftName == 'day'){
      if(dateToggle==false){ 
        const datee = new Date(date);
        datee.setDate(date.getDate() + 1);
         increasedDate = date.toISOString().split('T')[0];
        console.log('increased date', increasedDate)
        setDayDate(increasedDate)
        setSelectDate(increasedDate)
        console.log('selected date', selectDate)
        setDateToggle(true)
        setNightDate(null) 
       
      }
      else{
        const converted = date.toISOString().split('T')[0] 

        setDayDate(converted)
        setSelectDate(converted)
        console.log('this is day datee', dayDate)
        console.log('this is night date', nightDate)
        setNightDate(null)
      }
    }
    else if(shiftName == 'night'){
      if(dateToggle==false){ 
        const datee = new Date(date);
        datee.setDate(date.getDate() + 1);
         increasedDate = date.toISOString().split('T')[0];
        console.log('increased date', increasedDate)
        setNightDate(increasedDate)
        setSelectDate(increasedDate)
        console.log('selected date', selectDate)
        setDateToggle(true)
        setDayDate(null)
       
      }
      else{
        const converted = date.toISOString().split('T')[0] 

        setNightDate(converted)
        setSelectDate(converted)
        console.log('this is day datee', dayDate)
        console.log('this is night date', nightDate)
        setDayDate(null)
      }
      
    }
 
    setOpenCalender(false)
    
  }
  const handleCheckbox = (event) => {

    const {checked, value} = event.target
    setShiftName( checked?value :null ) 
    setOpenCalender(checked) 
    setShiftToggle(true)
    
    
  }

    function handleFilterDate(date){
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() + 1)
      const datePicked = newDate.toISOString().split('T')[0]
        
      
      // if (
      //   (!receivedDayArr || !receivedDayArr.includes(datePicked)) &&
      //   (!receivedNightArr || !receivedNightArr.includes(datePicked))
      // ) {
      //   return true; // Return true to disable the date
      // } else {
      //   return false; // Return false to enable the date
      // }    

      if(shiftName == 'day'){
        if(!receivedDayArr || !receivedDayArr.includes(datePicked)){
          return true;
        }                
        else{ 
          return false;
        }
      }
      else if(shiftName == 'night'){
       if (!receivedNightArr || !receivedNightArr.includes(datePicked)){
          return true;
        }
        else{
          return false;
        }
      }

      } 


      return(
        <>
        {ads.map((item)=>{ 
          return(
            <form key={item._id}>
    <div className=" flex  flex-col items-center mt-12  ">
  {/* <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md grid grid-cols-2"> */}
    <h1 className="text-2xl font-bold  mb-4">Venue Details</h1>

 <div className=''>
  
 
    <div className="flex flex-col gap-4">
      <div>
      <div>
      
        <p className="text-black text-3xl font-semibold">{item.title}</p>
      </div>
      <div>
        
        <p className="text-black text-3xl font-semibold">{item.category}</p>
      </div>
      {item.existingPhotos.map((image)=>{
        return (
        
        <div key={image} className='flex flex-wrap'>
        <img src={`http://127.0.0.1:4000/photoUploads/${image}`} className='w-96 h-96 my-3 rounded-xl ' />
        </div>
        )
      })}
      <div className='gap-2 mb-6'>
        <p className="text-gray-600 font-bold text-2xl">Owner Name:</p>
        <p className="text-black text-3xl font-semibold text-2xl">{item.ownerName}</p>
      </div>
      <div>
        <p className="text-gray-600 font-bold text-2xl">Location:</p>
        <p className="text-black text-3xl font-semibold">{item.address}</p>
      </div>
      </div>

      <div className="">
        <p className="text-gray-600 font-bold text-2xl">Description:</p>
        <p className="text-black text-3xl">{item.description}</p>
      </div>

      <div className="">
        <p className="text-gray-600 gap-2 font-bold text-2xl">Amenities</p>
        {
          item.amenities.map((amenity)=>{
            return(
              <div key={amenity} className='text-xl'>
                <p>{amenity}</p>
              </div>
            )
          })
        }
        
      </div>
      <div className="">
        <p className="text-gray-600 font-bold text-2xl">Guests Capacity</p>
        <p className="mt-2 text-black text-3xl text-2xl">No. of people: {item.capacity}</p>
      </div>
      <div className="">
        <p className="text-gray-600 font-bold text-2xl">Some Additional Information</p>
        <p className="mt-2 text-black text-3xl text-2xl">{item.addInfo}</p>
      </div>
     <div className='flex justify-between'> 
      <div>
        <p className="text-gray-600 font-bold text-2xl">Booking duration for Day Package:</p>
        <p className="text-black text-3xl font-semibold">{item.timeFrom}</p>
      </div>
      <div>
        <p className="text-gray-600 font-bold text-2xl">Booking duration for Night Package:</p>
        <p className="text-black text-3xl font-semibold">{item.timeTo}</p>
      </div>
      </div>
      <div className='flex m-8'>
      <div className='flex-col ml-16'>
        <label className='text-black text-3xl text-3xl font-bold'>Choose Your Slot</label>
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
        <DatePicker open={true}  onChange={(date)=>handleDateChange(date)} selected={shiftName === 'day'
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
          selectDate!==null ? (
          
            <p className='p-2 text-lg font-bold'>Your Booking Date is {selectDate}</p>
          ) : (
            <p className='p-2 text-lg font-bold'>No date has been selected</p>
          )

        }
      </div>
      </div>
      <div className="flex items-center mt-72 ">
      { shiftName == 'day' ? 
        <>
        <label className="text-gray-600 text-2xl font-bold flex">
          <input type='checkbox' checked={priceCheck == item.dayPrice} value={item.dayPrice} onChange={handlePrice} className='mx-4' required/>
          Price</label>
        <p className="m-3 text-black text-3xl text-4xl font-bold">Rs. {item.dayPrice}</p>
        </> 
        : shiftName == 'night' ? 
        <>
        <label className="text-gray-600 text-2xl font-bold flex">
          <input type='checkbox' checked={priceCheck == item.nightPrice} value={item.nightPrice} onChange={handlePrice} className='mx-4' required/>
          Price</label>
        <p className="m-3 text-black text-3xl text-4xl font-bold">Rs. {item.nightPrice}</p>
        </>
        : <p className='font-bold text-2xl'>No Package Selected</p>
      }
      </div>

    </div>

    <div className="mt-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={booking} >Book Now</button>
    </div>
    </div>
  </div>


</form>
        )})}

</>
    

      
      ) 
      
      }


