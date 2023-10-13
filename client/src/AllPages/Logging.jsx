import axios from 'axios';
import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';

function Logging() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false)

async function Login(ev){
  ev.preventDefault();
  try {
    
    await axios.post('/logging', {email,password})
    alert('Login was successful')
    console.log("login successfull")
    setNavigate(true)
  } catch (error) {
    alert('Login was unsuccessful')
    console.log("login unsuccessfull")

  }
}

if(navigate){
  return <Navigate to={'/'} />
}


  return (
   <div className=' mt-20 grow flex justify-around items-center'> 
    <div className='ml-15'>
      <h1 className='mt-8 text-center text-3xl'>Login</h1>
      <form className='mt-5 max-w-xs mx-auto' onSubmit={Login}>
        <div>Email Address 
        <input type="email address" placeholder='Enter your email' className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'
        value={email}
        onChange={(ev)=>setEmail(ev.target.value)}
        />
        Password
        <input type="password" placeholder='Enter your password' className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'
        value={password}
        onChange={(ev)=>setPassword(ev.target.value)}
        />
        </div>
        <button className='bg-primary w-full border rounded-full mt-3 py-2'>
            Login 
        </button>
        <div className='mt-3'> 
        Not registered?
        <Link to={'/signup'} className='ml-2 underline font-bold'>Sign up here.</Link>
        </div>
      </form>
    </div>
    </div> 
  )
}

export default Logging
