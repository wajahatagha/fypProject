import React, {useState} from 'react'

function AmenityComp({amenities, setAmenities}) {
 
   

    function handleAmenities(ev){
        console.log(ev.target.name);
        const {name,checked} = ev.target 
        if(checked){
        
        return  setAmenities([...amenities,name])
        }
        else{
          return setAmenities([...amenities.filter(amenitiesIterator=> amenitiesIterator !== name)])
        }
        }


    return (
    <>
    <div className="options-opt">
                        <label>
                            
                            <input type="checkbox" name='wifi' onChange={handleAmenities}/> 
                            Wifi
                        </label>
                        <label>
                            
                            <input type="checkbox" name='swimming pool' onChange={handleAmenities}/> 
                            Swimming Pool
                        </label>
                        <label>
                           
                            <input type="checkbox" name='air-conditioning' onChange={handleAmenities}/> 
                            Air Conditioning
                        </label>
                        <label>
                           
                            <input type="checkbox" name='bbq-grill' onChange={handleAmenities}/> 
                            BBQ grill
                        </label>
                        <label>
                           
                            <input type="checkbox" name='board-games' onChange={handleAmenities}/> 
                            Board games
                        </label>
                        <label>
                           
                            <input type="checkbox" name='kitchen-cutlery' onChange={handleAmenities}/> 
                            Kitchen cutlury
                        </label>
                    </div>
    </>
  )
}

export default AmenityComp
