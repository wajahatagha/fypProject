import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Signup() {

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')






async function Signing(ev){
    ev.preventDefault();
    try {
      await axios.post('/signup', {
        name,
        email,
        password
    })
    .then(res =>{console.log(res)})
    alert('Registration Completed');
    } catch (error) {
      alert('There was a problem in registration')
    }
  
    
    
}

// axios.get('/test')


  return (
   <div className=' mt-20 grow flex justify-around items-center'> 
    <div className='ml-15'>
      <h1 className='mt-8 text-center text-3xl'>Sign Up</h1>
      <form className='mt-5 max-w-xs mx-auto' onSubmit={Signing}>
        
        <div>
        Name     
        <input type="text" placeholder='Enter your name' value={name} onChange={(event)=>setName(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'/>    
        Email Address 
        <input type="email" placeholder='Enter your email' value={email} onChange={(event)=>setEmail(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'/>
        Password
        <input type="password" placeholder='Enter your password' value={password} onChange={(event)=>setPassword(event.target.value)} className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'/>
        </div>
        <button className='bg-primary w-full border rounded-full mt-3 py-2' >
            Signup
        </button>
        <div className='mt-3'> 
        Already have an Account?
        <Link to={'/logging'} className='ml-2 underline font-bold'>Login here.</Link>
        </div>
      </form>
    </div>
    </div> 
  )
}

export default Signup