import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

import React from 'react'
import { Navigate } from "react-router-dom";

function UserContextProvider({children}) { //These children are routes in App.jsx that are sent as props and received over here
  const [user, setUser ] = useState(null)
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
useEffect(() => {

  const fetchData = async () => {
    if (!user) {
      try {
        const response = await axios.get('/profile');
        const data = response.data;
        setUser(data);
        console.log('User set in state:', data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  fetchData();
 
}, [user])






 
    return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
