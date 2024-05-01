import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

export default function AdminHome() {

const [venuesData, setVenuesData] = useState([])
const [bookingsData, setBookingsData] = useState([])

const {user, setUser} = useContext(UserContext)

const navigate = useNavigate();


useEffect(() => {
  
axios.get('/adminVenues').then((res)=> {
    const {venueData, bookingdata} = res.data
    setVenuesData(venueData)
    setBookingsData(bookingdata)
})
  
}, [])

async function handleLogout (){
    await axios.post('/adminLogout')
    // setUser(null)
    navigate('/')

}

  return (
    <div>
        
        AdminHome
<button onClick={handleLogout} className='bg-purple-500 text-white rounded-full p-3'>
    Logout
</button>
    </div>
  )
}
