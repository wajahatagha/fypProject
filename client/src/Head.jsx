import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

function Head() {

const {user} = useContext(UserContext)

  return (
    <div className='container'>
       <header className='flex justify-between'>
          <Link to={'/'} className='text-xl font-bold p-2'>PakVenues</Link>
          <div className='flex rounded-full border border-gray-600 px-4 mt-2 mr-2 items-center shadow-md shadow-gray-400'>
           <div className='px-4'> Choose Place</div>
           <div className="border-l border-gray-300 h-8 w-2 p-2"></div>
           <div className='px-4'> Choose Time</div>
           <div className="border-l border-gray-300 h-8 w-2 p-2"></div>
           <div className='px-4'> Search </div>
           <button className='bg-primary rounded-full p-1'>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>

           </button>
          </div>
          <Link to={user ? '/accPage' : '/logging'} className='flex  mt-2 mr-7 items-center '>

{/* <button> */}
{/* This is Hamburger logo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg> */}

{  //**********NEED TO UNDERSTAND THIS PART!!!!!!!!!! */
  user ? (
    <div className='p-3 rounded-full bg-primary'  >
      Welcome, {user.name}
    </div>
  ) : <button className='bg-primary h-10 w-20 rounded-full'>Log in</button>
}
{/* </button> */}

</Link>
        </header>
    </div>
  )
}

export default Head
