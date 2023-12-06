import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Ads() {
  
const [ads, setAds] = useState([])


  useEffect(() => {
    axios.get('/displayAds').then((response)=>{
        const {data} = response
        console.log(data);
        return setAds(data) 
    })
  
    
  }, [])
  
  
  
  
  
  
    return (
    <div>
      {
        ads.length>0 && ads.map((place)=>
        
        {
            return (
                <div key={place._id}>
                    {place.title}
                </div>
            )
        }

        )
      }
    </div>
  )
}

export default Ads
