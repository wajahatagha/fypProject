import React, { useContext } from 'react'
import { UserContext } from '../UserContext'
import { Link, Navigate, useParams } from 'react-router-dom'

function Account() {
  
    const {user} = useContext(UserContext)
  
    const {nestPage} = useParams();
    
    function Linking(type=null) {
        let cNames = 'py-2 px-6 ' 
        if(type == nestPage || (nestPage == undefined && type == nestPage)){
            cNames += 'bg-primary rounded-full';
        }
        return cNames;
    }
  
    return (
    <div>
      
      {
        user ? 
        
            <div className='flex flex-wrap mt-20 justify-center w-full gap-2'>
                <nav>
                    <Link to={'/accPage'} className={Linking(undefined)}>User profile</Link>
                    <Link to={'/accPage/venues'} className={Linking('venues')}>My Venues</Link>
                    <Link to={'/accPage/bookings'} className={Linking('bookings')}>My Bookings</Link>
                </nav>

               {nestPage == undefined && (

                <div className='w-full text-center mt-20'>

                   <p> Name = {user.name}</p>
                   <p> Email = {user.email}</p>
                   <button className='bg-primary rounded-full p-3 mt-8'>Logout</button>
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
