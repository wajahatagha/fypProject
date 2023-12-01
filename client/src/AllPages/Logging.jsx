import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { toast} from 'react-toastify'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { UserContext } from '../UserContext';
import 'react-toastify/dist/ReactToastify.css';



function Logging() {
const navigatee = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [navigate, setNavigate] = useState(false)
  const {user, setUser} = useContext(UserContext); //destructuring setUser from UserContext.Provider in value prop
  

  useEffect(() => {
    if(user){
      console.log("USer found");
      // navigatee('/')
      
    }
    else{
      console.log("USer not found");
    }
  }, [])
  
  



  if(navigate){
    navigatee('/')
  }
  
  const showToastMessage = (isSuccess) => {
    if (isSuccess === true) {
      toast.success( "Success Notification !", { position: toast.POSITION.TOP_CENTER })
      console.log("IsSuccess",isSuccess);
      
    } if(isSuccess === false ) {
      toast.error("Login unsuccessful", { position: toast.POSITION.TOP_CENTER });
    }
  };
  async function Login(ev){
    ev.preventDefault()
  try {

    
   const LoginInfo = await axios.post('/logging', {email,password}) //putting the data that we are getting from api response into login info which puts it in the User Context
   
   setUser(LoginInfo.data);
   console.log("Logging in", LoginInfo.data);
   console.log("login successfull")
   setNavigate(true)
   
   
   showToastMessage(true)
  } catch (error) {
    showToastMessage(false)
    console.log("login unsuccessfull")
    
  }
}



  return (
  //  <div className=' mt-20 grow flex justify-around items-center'> 
  //   <div className='ml-15'>
  //     <h1 className='heading-title font-bold'>Login</h1>
  //     <form className='mt-5 max-w-xs mx-auto' onSubmit={Login}>
  //       <div>Email Address 
  //       <input type="email address" placeholder='Enter your email' className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'
  //       value={email}
  //       onChange={(ev)=>setEmail(ev.target.value)}
  //       required
  //       />
  //       Password
  //       <input type="password" placeholder='Enter your password' className='block my-2 border rounded-full py-2 pl-[32.75px] pr-[100.75px]'
  //       value={password}
  //       onChange={(ev)=>setPassword(ev.target.value)}
  //       required
  //       />
  //       </div>
  //       <button className='bg-primary w-full border rounded-full mt-3 py-2'>
  //           Login 
  //       </button>
  //       <div className='mt-3'> 
  //       Not registered?
  //       <Link to={'/signup'} className='ml-2 underline font-bold'>Sign up here.</Link>
  //       </div>
  //       <div>
         
  //       </div>
  //     </form>
  //   </div>
  //   </div> 



  <div className='login'>
    <div className="wrapper">
      <form onSubmit={Login}>
        <h1 className=''>Login</h1>
        <div className="input-box">
          <input type="email" placeholder='Email'
              value={email}
              onChange={(ev)=>setEmail(ev.target.value)}
              required
          />
          <i className='bx bxs-user'></i>
        </div>

        <div className="input-box">
          <input type="password" placeholder='Password'
                value={password}
                onChange={(ev)=>setPassword(ev.target.value)}
                required
          />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button className='btn' >
             Login 
             
        </button>

        <div className='register-link'> 
          <p>Not registered?<Link to={'/signup'} className='ml-2 underline font-bold'>Sign up here.</Link></p>
        </div>
      </form>
    </div>
        
  </div>
  )
}

export default Logging
