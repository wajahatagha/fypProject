import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

import React from 'react'

function UserContextProvider({children}) { //These children are routes in App.jsx that are sent as props and received over here
  
useEffect(() => {

if(!user){
  axios.get('/profile').then(({data})=>{ //if there is no data in user(e.g when page gets refreshed), it is putting in setUser the data it's fetching
    //from /profile endpoint where the data is being get by reading the cookie through cookie parser middleware and through that it's extracting 
    //data from the token which doesn't get deleted even after the page gets refreshed
    setUser(data)
    console.log('====================================');
    console.log(data);
    console.log('====================================');
  })
}
 
}, [])





 const [user, setUser] = useState(null)
 
    return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
