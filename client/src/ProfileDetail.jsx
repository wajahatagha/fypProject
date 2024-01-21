// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "./UserContext";
// import { Link,  useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Account from "./AllPages/Account";

// function ProfileDetail() {
 
//   const [edit, setEdit] = useState(false);
//   const { user, setUser } = useContext(UserContext);
//   // const [navigate, setNavigate] = useState(false);
//   const navigate = useNavigate()
//   const [name1, setName1] = useState('')
//   const [password1, setPassword1] = useState('')



//     async function Save() {
    
//         const edit = await axios.post('/editProfile',{name1,password1} )
//         console.log("edit profile",edit.name);
//         if(edit){
//           alert("Profile Updated!")
//         }
//         else{
//           alert("Error")
//         }
    
//       }
      
      
    
//       async function Logout() {
//         await axios.post("/logout");
//         setUser(null);
//         navigate("/logging")
//       }
    
      

//     return (
//       <div className="w-full text-center mt-20">
        
//       {edit == true ? <div className="flex items-center p-7 font-bold text-xl">
//         Enter New Name<input type="text" className="w-1/2  border rounded-full shadow-lg p-3 " value={name1} onChange={(ev)=>setName1(ev.target.value)}/>
//         Enter New Password<input type="password" className="w-1/2 border rounded-full shadow-lg p-3" value={password1} onChange={(ev)=>setPassword1(ev.target.value)} />
//         <div className="w-1/2">
//           <button className="bg-purple-500 text-white p-4 rounded-full" onClick={Save}>Save</button>
//           </div>
//         </div> : (
//         <>
//       {/* <p> Name = {user.name}</p>
//            <p> Email = {user.email}</p>
//            <p> User ID = {user.id}</p> */}

//       <div className="account">
//         <div className="acc-wrapper">
//           <h1>User Details</h1>
//           <div className="para">
//             <p> Name: {user.name}</p>
//             <p> Email: {user.email}</p>
//             <p> User ID: {user.id}</p>
//           </div>

//           {/* <p> Password = {user.password}</p> */}
//           <button onClick={Logout} className="btnn">
//             Logout
//           </button>
//           <button onClick={()=> setEdit(true)} className="btnn">
//             Edit Profile
//           </button>
//         </div>
//       </div>
//       </>
// )}

//     </div>
//   )
// }

// export default ProfileDetail


import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { Link,  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Account from "./AllPages/Account";
import './Account.css'

function ProfileDetail() {
 
  const [edit, setEdit] = useState(false);
  const { user, setUser } = useContext(UserContext);
  // const [navigate, setNavigate] = useState(false);
  const navigate = useNavigate()
  const [name1, setName1] = useState('')
  const [password1, setPassword1] = useState('')



    async function Save(e) {

        const edit = await axios.post('/editProfile',{name1,password1} )
        if(edit){
          alert("Profile Updated!")
          setEdit(false)
          console.log()
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
      {edit == true ? 
      <div className="form-parent-edit">
        <div className="form-label">
      <label htmlFor="" className="edit-label-name"> Enter New Name</label>
       <input type="text" className="w-1/2  border rounded-full shadow-lg p-3 name-input " value={name1} onChange={(ev)=>setName1(ev.target.value)}/>
       <label htmlFor="" className="edit-label-name"> Enter New Password</label>
        <input type="password" className="w-1/2 border rounded-full shadow-lg p-3 name-input" value={password1} onChange={(ev)=>setPassword1(ev.target.value)} />
        <div className="w-1/2 btn-parent2">
          <button className="bg-purple-500 text-white p-4 rounded-full" onClick={Save}>Save</button>
          </div>
        </div> 
      </div>
         : (
        <>
      {/* <p> Name = {user.name}</p>
           <p> Email = {user.email}</p>
           <p> User ID = {user.id}</p> */}
        <div className="container mb-10">
              <div class="mx-auto right-0 mt-2  accountbody">
                <div class="bg-white rounded overflow-hidden shadow-lg">
                    <div class="text-center p-6 accback bg-gray-800 border-b">
                    <i class="fa-regular fa-user userpng" ></i>
                    <p class="pt-2 accname font-semibold text-gray-50">{user.name}</p>
                    <p class=" text-gray-100 accemail">{user.email}</p>
                    <div class="mt-5 buttons">
                        <button className='edit-btn' onClick={EditProfile}>
                            Edit Account
                        </button>
                        <button className='edit-btn' onClick={Logout} >
                            Logout
                        </button>
                    </div>
                    </div>
                    <div class="border-b">
                        <Link to="/accPage/venues" >
                            <a class="btn-parent px-4 py-2 hover:bg-gray-100 flex">
                                <div class="text-green-600">
                                <i class="fa-solid fa-eye eyefont" ></i>
                                </div>
                                <div class="pl-3">
                                <p class="viewadd-btn font-bold text-gray-800 bookingdesign leading-none">
                                  Venue
                                </p>
                                <p class="viewadd-btn-child text-gray-500">View your <b>Venue</b></p>
                                </div>
                            </a>
                        </Link>
                        <Link to="/accPage/bookings" >
                            <a class="btn-parent px-4 py-2 flex">
                                <div class="text-gray-800">
                                <i class="fa-regular fa-calendar-days eyefont"></i>
                                </div>
                                <div class="pl-3  bookingdesign">
                                <p class="viewadd-btn font-bold text-gray-800 leading-none">Bookings</p>
                                <p class="viewadd-btn-child text-gray-500">View your last <b>Bookings</b></p>
                                </div>
                            </a>
                        </Link>
                    </div>

                    <div class="">
                        <div class="w-full px-4 py-2 pb-4  flex">
                            
                        </div>
                    </div>
                </div>
            </div>
           </div>
      </>
)}

    </div>
  )
}

export default ProfileDetail