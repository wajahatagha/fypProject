import React, {useState} from 'react'
import axios from 'axios';

function PicturesComp({picLink,setPicLink, existingPhotos, setExistingPhotos}) {

    
    






    async function PhotoUrl(ev){
        ev.preventDefault()
        const {data} = await axios.post('/photo-link', {link: picLink}) //{data} is destructured from the response
      // console.log('====================================');
      // console.log(data);
      // console.log('====================================');
      setExistingPhotos(prev => {
        return [...prev,data]
      })
      setPicLink('')
      }
      
      function Uploading(ev){
        const files = ev.target.files;
        console.log(files);
        const data = new FormData(); //uses a form to allow users to select and submit files and allows to append files directly preserving their binary content
        for (let i = 0; i < files.length; i++) {
          data.append('pictures', files[i]) //pictures is the fieldname for the picture that will be received at endpoint 
          
        }
        axios.post('/uploading', data)
        .then(res => {
          const {data} = res;
          setExistingPhotos(prev => {
            return [...prev, ...data]
          })
        }
          )
      }
    return (
    <>
       <div className="venue-details">
                        <span className='details'>Photos</span>
                        <input value={picLink} onChange={ev=>setPicLink(ev.target.value)} type="text"  placeholder='Add a photo using link'/>
                      </div>

                    {existingPhotos.length > 0 && existingPhotos.map((data) => {
                      return(
                      <div key={data} className='flex h-32'>
                      <img src={`http://127.0.0.1:4000/photoUploads/${data}`} className=' w-full rounded-2xl'/>
                      </div>
                      )
                    })}
                      <div className="button-container">
                        <button onClick={PhotoUrl} className="left-button">Upload by Link</button>
                        <label  className="right-button  ">
                          <input type="file" className='hidden' onChange={Uploading} multiple/>
                          Upload Photo</label>
                      </div>
    </>
  )
}

export default PicturesComp
