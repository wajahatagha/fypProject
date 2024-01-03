import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Inbox() {
    const [webSoc, setWebSoc] = useState(null)
    const [userInfo, setUserInfo] = useState(null);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);
    const [owner, setOwner] = useState('')
    const [activeNow, setActiveNow] = useState([])
    

    


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const idFromQuery = searchParams.get('id');


    useEffect(() => {

        if(idFromQuery){
      
            axios.put('/getOwner/'+idFromQuery).then((response)=>{
            const {data} = response; 
            setOwner(data);
            console.log('====================================');
            console.log(owner);
            console.log('====================================');

            })
        }
        
        const socket = new WebSocket(`ws://127.0.0.1:4000?${new URLSearchParams({ id: idFromQuery })}`)
        setWebSoc(socket)
        socket.addEventListener('message', Messages)
      // const socket =  new WebSocket('ws://127.0.0.1:4000')
      //   setWebSoc(socket)
      //   socket.addEventListener('message', Messages)

        
      
    }, [idFromQuery])

    function showActive(online) {
      setActiveNow(() => {
        // Map the 'online' array to an array of names
        const newActiveNow = online.map(p => p.name);
        console.log(newActiveNow); // Log the new array
    
        // Return the new array to update the state
        return newActiveNow;
      });
    }


        function Messages(e){
          const msgData = JSON.parse(e.data)
          if ('active' in msgData){
            showActive(msgData.active)
          }
          // console.log('====================================');
          // console.log(msgData);
          // console.log('====================================');
            // const data = JSON.parse(e.data);

            // if (data.type === 'userInfo') {
            //   setUserInfo({  name: data.name });
            // }
        
            // if (data.type === 'text') {
            //   setMessages(prevMessages => [...prevMessages, { from: data.from, text: data.text, createdAt: data.createdAt }]);
            // }
    }
       
       
    // function sendMessage() {
    //     if (inputText.trim() !== '') {
    //         const recipientId = owner._id;
    //       webSoc.send(JSON.stringify({ type: 'text', text: inputText, recipientId }));
    //       setMessages(prevMessages => [
    //         ...prevMessages,
    //         { from: userInfo.name, text: inputText, createdAt: new Date().toISOString() },
    //       ]);
    //       setInputText('');
    //     }
    //   }


  return (
    <div className='flex h-screen'>
      <div className='bg-purple-200 w-1/3 '>
        <div className='text-4xl font-bold m-3 mt-4'>Inbox
        
        {
          activeNow.map((person)=>{
            return(
              <div>
          {person}
              </div>
            )
          })
        }
        
        </div>
        
        </div>
      <div className='bg-purple-300 w-2/3 flex flex-col'>
       <div className='m-3 flex-grow text-4xl font-bold mt-4'> Send A Message to {owner.name}
        
         {/* {messages.map((message, index) => (
          <div key={index}>
            <p>{message.from}: {message.text}</p>
          </div>
        ))} */}
       </div>
      <div className='flex gap-2 ml-3 mb-4'>
        <input value={inputText} onChange={(e) => setInputText(e.target.value)} type='text' className='bg-white border p-3 w-2/3 rounded-lg ' placeholder='Type your message here'/>
      <button  className='bg-purple-900 text-white p-3 rounded-full' >
        Send
      </button>
      </div>
      
      
      </div>
    </div>
  )
}

export default Inbox
