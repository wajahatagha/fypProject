import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Venues() {
  
  
  const {event} = useParams();
  console.log(event);
    return (
    <div>
        {event !== 'new' && (


      <div className='text-center mt-6'>
<Link className='inline-flex gap-1 items-center bg-primary py-1 px-6 rounded-full text-center' to={'/accPage/venues/new'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>Add a Venue</Link>
      </div>
        )}
        {event == 'new' && (
        <div className='flex-vertical items-center ml-10 mt-3'>
            <form>
            <h2>What best describes your Venue?</h2>
            <div>
              <label className='flex'>
                <input type='checkbox' />
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

FarmHouse</span>
                
              </label>
            </div>
            <div>
              <label className='flex'>
                <input type='checkbox' />
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

Wedding Hall</span>
                
              </label>
              <label className='flex'>
                <input type='checkbox' />
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

Beach Hut</span>
                
              </label>
            </div>
            
            <h2 className='text-xl mt-5'>Title</h2>    
            <input className='border border-black w-1/2 rounded-full p-2' type='text' placeholder='Enter Title' />
            <h2 className='text-xl mt-5'>Address</h2>
            <input className='border border-black w-1/2 rounded-full p-2' type='text' placeholder='Address' /> 
            <h2 className='text-xl mt-5'>Photos</h2>
            <div className='flex gap-3'>
            <input className='border border-black w-1/2 rounded-full p-2' type='text' placeholder='Add a photo using link...' />
            <button className='bg-primary p-2 rounded-full cursor-move'>
              Add Photo</button>
            </div>
            <div className='grid grid-cols-3 lg:grid-cols-6 md:grid-cols-4 mt-3'>
            <button className='flex items-center border bg-gray-300 rounded-full p-2 pt-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
</svg>
Upload from device </button>
            </div>
            <h2>Description</h2>
            <textarea className='w-40 h-30 border border-black rounded-xl'></textarea>
            <h2>Amenities</h2>
            <p>Select the amenities provided on this venue</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
              <label>
                <input type='checkbox' />
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
</svg>
Wifi</span>
                
              </label>
            
            
              <label>
                <input type='checkbox' />
                <span>Swimming pool</span>
              </label>
           
              <label>
                <input type='checkbox' />
                <span>Air Conditioning</span>
              </label>
           
              <label>
                <input type='checkbox' />
                <span>BBQ Grill</span>
              </label>
            
              <label>
                <input type='checkbox' />
                <span>Board Games</span>
              </label>
            
              <label>
                <input type='checkbox' />
                <span>Kitchen Cutlery</span>
              </label>
            </div>
            </form>
        </div>    
        )}
      
    </div>
  )
}

export default Venues
