import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from '../UserContext';
// import '../AdDetails.css'


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
        setReceivedDayArr(data.bookingDateDay);
        setReceivedNightArr(data.bookingDateNight);
        return setAds([data])
      })
    }
  },[idFromQuery, selectDate])

  // function handlePrice(event){
  //    setPriceCheck(event.target.value)
  // }

  function booking(ev){
    ev.preventDefault();
    if(!priceCheck){
      return  alert('Details missing')
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
    } else {
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
        setDayDate(increasedDate)
        setSelectDate(increasedDate)
        setDateToggle(true)
        setNightDate(null) 
      } else {
        const converted = date.toISOString().split('T')[0] 
        setDayDate(converted)
        setSelectDate(converted)
        setNightDate(null)
      }
    }
    else if(shiftName == 'night'){
      if(dateToggle==false){ 
        const datee = new Date(date);
        datee.setDate(date.getDate() + 1);
        increasedDate = date.toISOString().split('T')[0];
        setNightDate(increasedDate)
        setSelectDate(increasedDate)
        setDateToggle(true)
        setDayDate(null)
      } else {
        const converted = date.toISOString().split('T')[0] 
        setNightDate(converted)
        setSelectDate(converted)
        setDayDate(null)
      }
    }
    setOpenCalender(false)
  }

  const handleCheckbox = (event) => {
    const {checked, value} = event.target
    setShiftName( checked ? value : null ) 
   
    setOpenCalender(checked) 
    setShiftToggle(true)
  }

  function handleFilterDate(date){
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + 1)
    const datePicked = newDate.toISOString().split('T')[0]
    if(shiftName == 'day'){
      if(!receivedDayArr || !receivedDayArr.includes(datePicked)){
        return true;
      } else { 
        return false;
      }
    } else if(shiftName == 'night'){
       if (!receivedNightArr || !receivedNightArr.includes(datePicked)){
        return true;
      } else {
        return false;
      }
    }
  } 

  return(
    <>
      {ads.map((item)=>{ 
        return(
        // <div className='ad'>
        //   <form key={item._id} className="form-containersss">
        //     <h1 className='text-5xl font-bold mb-4 mx-auto text-center mt-4'>VENUE DETAILS</h1>
        //     <div className="details-ad">
        //       <label className='title-label'>Name</label>
        //       <div className='title-info'>
        //         <input type="text"  value={item.title} />
        //       </div>
        //       <label className='title-label'>Category</label>
        //       <div className='title-info'>
        //         <input type="text"  value={item.category} />
        //       </div>
        //       <div>
        //         <label className='title-label'>Photos</label>
        //       </div>
        //       {item.existingPhotos.map((image)=>{
        //         return (
          
        //           <div key={image} className='flex flex-wrap'>
        //             <img src={`http://127.0.0.1:4000/photoUploads/${image}`} className='w-96 h-96 my-3 rounded-xl' />
        //           </div>
        //         )
        //       })}
        //       <label className='title-label'>Owner Name</label>
        //       <div className='title-info'>
        //         <input type="text" value={item.ownerName} />
        //       </div>
        //       <label className='title-label'>Address</label>
        //       <div className='title-info'>               
        //         <input type="text"  value={item.address} />
        //       </div>
        //     <label className='title-label'>Description</label>
        //     <div className="title-info">             
        //       <input type="text"  value={item.description} />
        //     </div>
        //     <div className="">
        //       <label className='title-label'>Amenities</label>
        //       <div className="flex flex-wrap">
        //         {item.amenities.map((amenity) => {
        //           return (
        //             <div key={amenity} className='text-xl mr-4 ml-7'>
        //               <p>{amenity}</p>
        //             </div>
        //           )
        //         })}
        //       </div>
        //     </div>
        //     <label className='title-label'>Guest Capacity</label>
        //     <div className="title-info">
        //       <input type="text" value={item.capacity} />
        //     </div>
        //     <label className='title-label'>Additional Information</label>
        //     <div className="title-info">
        //       <input type="text" value={item.addInfo} />
        //     </div>
        //       <label className='title-label'>Booking duration for Day Package</label>
        //       <div className='title-info'>
        //       <input type="text" value={item.timeFrom} />
        //       </div>

        //       <label className='title-label'>Booking duration for Night Package</label>
        //       <div className='title-info'>
        //       <input type="text" value={item.timeTo} />
        //       </div>

             
            
        //     <div className='flex m-8'>
        //       <div className=''>
        //         <label className='title-label'>Choose Your Slot</label>
        //         <div className='flex gap-4 items-center'>
        //           <input 
        //             type='checkbox' 
        //             className='h-4 w-4'
        //             value={'day'}
        //             onChange={handleCheckbox}
        //             checked={shiftName == 'day'}
        //           />
        //           <label>Day Package</label>
        //           <input 
        //             type='checkbox' 
        //             className='h-4 w-4'
        //             value={'night'}
        //             onChange={handleCheckbox}
        //             checked={shiftName == 'night'}
        //           />
        //           <label>Night Package</label>
        //         </div>
        //         { openCalender && (
        //           <DatePicker 
        //             open={true}  
        //             onChange={(date)=>handleDateChange(date)} 
        //             selected={shiftName === 'day'
        //               ? dayDate
        //               : shiftName === 'night'
        //               ? nightDate
        //               : new Date()} 
        //             className='relative mb-4'
        //             filterDate={handleFilterDate}
        //           />
        //         )}
        //         {
        //           selectDate!==null ? (
        //             <p className='p-2 text-lg font-bold'>Your Booking Date is {selectDate}</p>
        //           ) : (
        //             <p className='p-2 text-lg font-bold'>No date has been selected</p>
        //           )
        //         }
        //       </div>
        //     </div>
        //     <div className="flex items-center mt-10 ">
        //       { shiftName == 'day' ? 
        //         <>
        //           <label className="text-gray-600 text-xl font-bold flex">
        //             <input type='checkbox' checked={priceCheck == item.dayPrice} value={item.dayPrice} onChange={handlePrice} className='mx-4' required/>
        //             Price</label>
        //           <p className="m-3 text-3xl font-bold">Rs. {item.dayPrice}</p>
        //         </> 
        //         : shiftName == 'night' ? 
        //         <>
        //           <label className="text-gray-600 text-xl font-bold flex">
        //             <input type='checkbox' checked={priceCheck == item.nightPrice} value={item.nightPrice} onChange={handlePrice} className='mx-4' required/>
        //             Price</label>
        //           <p className="m-3 text-3xl font-bold">Rs. {item.nightPrice}</p>
        //         </>
        //         : <p className='font-bold text-xl'>No Package Selected</p>
        //       }
        //     </div>
        //     <div className="info-button">
        //       <button onClick={booking}>Book Now</button>
        //     </div>
        //     </div>
        //   </form>
        //   </div>
       <div className='flex justify-evenly'> 
        <div className=' m-8 my-16  flex flex-col' style={{minHeight:'100vh'}}>
          <div className='my-8 text-5xl font semibold'>
            {item.title}
          </div>
          <div className='text-3xl '>
            {item.category}
          </div>
          <div className='w-ful my-12 rounded-xl bg-gray-500'>
          <h1 className='text-white m-3 text-3xl my-4'>Description</h1>
          <p className='m-3 text-white text-xl'>{item.description}</p>
          </div>
          <div className='my-8  w-full text-3xl border-solid border-black border-1'>
          <h1 className='m-3'>Images</h1>
            {item.existingPhotos.map((image)=>[
              <img src={`http://127.0.0.1:4000/photoUploads/${image}`} className='w-96 m-3 h-96 my-3 rounded-xl' />
            ])}
          </div>
          <div className='w-full my-12 rounded-xl bg-red-900 '>
           <div className='flex justify-between'> 
          <h1 className='text-white m-3 text-3xl my-4'>Amenities</h1>
          <img src='https://cdn.wallpapersafari.com/84/87/47NbUp.jpg' className=' m-3 rounded-full w-96'/>
          </div>
          <div className=' m-3 text-white text-xl'>
{item.amenities.map((amenity) => {
                  return (
                    <div key={amenity} className='text-xl mr-4 ml-7'>
                      <p>{amenity}</p>
                      
                    </div>
                  )
                })}</div>
          
          </div>
          <div className='text-3xl  m-3 '>
                Guest Capacity
                <p>{item.capacity}</p>
          </div>
          <div className='w-ful my-12 rounded-xl bg-purple-900 flex justify-evenly'>
            <div>
          <h1 className='text-white m-3 text-3xl my-4'>Booking Duration for Day</h1>
          <p className='m-3 text-white text-xl'>{item.timeFrom}</p>
          </div>
          <div>
          <h1 className='text-white m-3 text-3xl my-4'>Booking Duration for Night</h1>
          <p className='m-3 text-white text-xl'>{item.timeTo}</p>
          </div>
          </div>
          

        </div>
        <div className='m-8 my-28 px-12  flex flex-col border border-solid border-2' style={{height:'50rem'}}>
        <div className='text-3xl  my-10'>
            Choose Your Slot
            <div className='flex my-12 justify-center items-center'>
            <input 
                    type='checkbox' 
                    className='h-4 w-4'
                    value={'day'}
                    onChange={handleCheckbox}
                    checked={shiftName == 'day'}
                  />
                  <label className='mx-6'>Day Package</label>
                  <input 
                    type='checkbox' 
                    className='h-4 w-4'
                    value={'night'}
                    onChange={handleCheckbox}
                    checked={shiftName == 'night'}
                  />
                  <label className='mx-6'>Night Package</label>
                  </div>
                  { openCalender && (
                  <DatePicker 
                    open={true}  
                    onChange={(date)=>handleDateChange(date)} 
                    selected={shiftName === 'day'
                      ? dayDate
                      : shiftName === 'night'
                      ? nightDate
                      : new Date()} 
                    className='relative mb-4'
                    filterDate={handleFilterDate}
                  />
                )}
                {
                  selectDate!==null ? (
                    <p className='p-2 text-lg font-bold'>Your Booking Date is {selectDate}</p>
                  ) : (
                    <p className='p-2 text-lg font-bold'>No date has been selected</p>
                  )
                }
                <div className='text-3xl  mt-20'>
                  Total Bill 
                  {
                    shiftName == 'day' ?  
                    (
                      <button onClick={()=>setPriceCheck(item.dayPrice)}  className='mt-4 text-5xl font-semibold'>
                        Rs. {item.dayPrice}
                       
                        </button> 
                    
                    ) 
                    : shiftName == 'night'? (
                      <button onClick={()=>setPriceCheck(item.nightPrice)} className='mt-4 text-5xl font-semibold'>
                        Rs. {item.nightPrice}
                        
                        </button> 
                    )
                   : <div className='mt-4 text-5xl font-semibold' >0</div>
                  }


                </div>


              <button className='mt-20 bg-purple-900 text-white p-3 rounded-2xl' onClick={booking}>Book Now</button>

          </div>
          </div>
        </div>
        )
      })}
    </>
  ) 
}
