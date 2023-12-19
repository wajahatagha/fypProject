import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Link,  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Account from "./AllPages/Account";

function ProfileDetail() {
 
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useContext(UserContext);
  // const [navigate, setNavigate] = useState(false);
  const navigate = useNavigate()
  const [name1, setName1] = useState('')
  const [password1, setPassword1] = useState('')



    async function Save() {
    
        const edit = await axios.post('/editProfile',{name1,password1} )
        console.log("edit profile",edit.name);
        if(edit){
          alert("Profile Updated!")
        }
        else{
          alert("Error")
        }
    
      }
      
      function EditProfile(){
        setEdit(true);
    
      }
    
      async function Logout() {
        await axios.post("/logout");
        setUser(null);
        navigate("/logging")
      }
    
      

    return (
      <div className="w-full text-center mt-20">
        
      {edit == true ? <div className="flex items-center p-7 font-bold text-xl">
        Enter New Name<input type="text" className="w-1/2  border rounded-full shadow-lg p-3 " value={name1} onChange={(ev)=>setName1(ev.target.value)}/>
        Enter New Password<input type="password" className="w-1/2 border rounded-full shadow-lg p-3" value={password1} onChange={(ev)=>setPassword1(ev.target.value)} />
        <div className="w-1/2">
          <button className="bg-purple-500 text-white p-4 rounded-full" onClick={Save}>Save</button>
          </div>
        </div> : (
        <>
      {/* <p> Name = {user.name}</p>
           <p> Email = {user.email}</p>
           <p> User ID = {user.id}</p> */}

      <div className="account">
        <div className="acc-wrapper">
          <h1>User Details</h1>
          <div className="para">
            <p> Name: {user.name}</p>
            <p> Email: {user.email}</p>
            <p> User ID: {user.id}</p>
          </div>

          {/* <p> Password = {user.password}</p> */}
          <button onClick={Logout} className="btnn">
            Logout
          </button>
          <button onClick={EditProfile} className="btnn">
            Edit Profile
          </button>
        </div>
      </div>
      </>
)}

    </div>
  )
}

export default ProfileDetail
