import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext'

function Head() {

const {user} = useContext(UserContext)


  return (
    <div>
       <header className='flex justify-between'>
          <p className='text-xl font-bold p-2'>PakVenues</p>
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
          <Link to={'/logging'} className='flex  mt-2 mr-7 items-center '>

<button>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

</button>
{  //**********NEED TO UNDERSTAND THIS PART!!!!!!!!!! */
  user ? (
    <div>
      {user.name}
    </div>
  ) : <p>Please Log in.</p>
}

</Link>
        </header>
    </div>
  )
}

export default Head
