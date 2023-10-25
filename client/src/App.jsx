import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import FirstPage from './AllPages/FirstPage'
import { Outlet, Route, Routes } from 'react-router-dom'
import Logging from './AllPages/Logging'
import Structure from './Structure'
import Signup from './AllPages/Signup'
import axios from 'axios'
import UserContextProvider from './UserContext'



axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials= true;

function App() {
  

  return (
    
    <>
  <UserContextProvider> 
   <Routes>

    <Route path='/' element={<Structure />}>
   <Route path='' element={<FirstPage />}/>
   <Route path='/logging' element={<Logging />}/>
   <Route path='/signup' element={<Signup />}/>
   </Route>
   </Routes>
  </UserContextProvider>    
   </>
  )
}

export default App
