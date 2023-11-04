import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Venues from './Venues';

function Account() {
  
    const {user,setUser} = useContext(UserContext)
    // const [first, setfirst] = useState(false)
  
    // const navigatee = useNavigate() 
    
    console.log("account page user detail,",user)
    
    const [navigate, setNavigate] = useState(false)
  
    const {nestPage} = useParams();
    
    function Linking(type=null) {
        let cNames = 'inline-flex gap-1 py-2 px-6 ' 
        if(type == nestPage || (nestPage == undefined && type == nestPage)){
            cNames += 'bg-primary rounded-full';
        }
        return cNames;
    }

    async function Logout(){
       await axios.post('/logout')
       setUser(null);
       setNavigate(true);
    }
  

    if(navigate){

      return  <Navigate to={'/logging'} /> 

    }

      
    

    
   

    return (
    <div>
      
      {
        
        user ? 
        
            <div className='flex flex-wrap mt-20 justify-center w-full gap-2'>
                <nav>
                    <Link to={'/accPage'} className={Linking(undefined)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
                    User Profile
                    </Link>
                    <Link to={'/accPage/venues'} className={Linking('venues')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
                    My Venues
                    </Link>
                    <Link to={'/accPage/bookings'} className={Linking('bookings')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>
                    My Bookings
                    </Link>
                </nav>

               {nestPage == undefined && (

                <div className='w-full text-center mt-20'>

                   <p> Name = {user.name}</p>
                   <p> Email = {user.email}</p>
                   <p> User ID = {user.id}</p>
                   {/* <p> Password = {user.password}</p> */}
                   <button onClick={Logout} className='bg-primary rounded-full p-3 mt-8'>Logout</button>
                </div>




               )
               
            }

            {nestPage == 'venues' && (
                <div className='w-full '>
                    <Venues />
                </div>
            )

            }

            </div>
        
        : <Link to={'/logging'} />
    }
        
        
        
        
        
        
      
    </div>
  )
}

export default Account
