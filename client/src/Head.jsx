import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import '../src/Head.css'

function Head() {
const {user} = useContext(UserContext)

const navigate=useNavigate();
const accountDetail=()=>{
  navigate('/accPage')
    // window.location.reload()
}

  return (

<div>
                <section className='header'>
      
               <Link to={'/'} className='text-4xl text-purple-900 font-bold '>Pak-Venues</Link>
                {/* <div className='flex rounded-full border border-gray-600 px-4 mt-2 mr-2 items-center shadow-md shadow-gray-400'> */}
               <div className='nav-head'>
               <nav className='navbar'>
               <div><Link to ={'/'} className='px-4 font-bold'>Home</Link></div> 
                <div><Link to={'/ads'} className='px-4 font-bold' >Venues</Link></div>
                <div><Link to={'/about'} className='px-4 font-bold'>About us</Link></div>
                <div><Link to={'/contact'} className='px-4 font-bold' >Contact us</Link></div>
                </nav>
               </div>
      
                {/* <button className='bg-primary rounded-full p-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
       <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
     </svg>
      
                </button> */}
                
      
      
      
                 <Link to={user ? '/accPage' : '/logging'} className='flex  mt-2 mr-7 items-center '> 
                
      
       {  //**********NEED TO UNDERSTAND THIS PART!!!!!!!!!! */
      
      // // abhi commment kia hai
        user ? (
          
           <button onClick={accountDetail} className='p-3 rounded-full bg-purple-700 text-white text-lg'> Welcome, {user.name}</button>
                
        ) : <button  id="login-btn" className=''>Log in</button>
      }
      {/* </button> */}
      
      </Link>
      
      {/* <div id="menu-btn" class="fas fa-bars"></div> */}
              
        </section>
  {/* <header>
    <div className="head-parent">
      <div className="head-child"></div>
      <div className="head-child"></div>
      <div className="head-child"></div>
    </div>
  </header> */}
</div>
  )
}

export default Head
