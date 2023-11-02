import React , { useState }from 'react'
import { Link } from 'react-router-dom'
import Head from '../Head'
import img1 from '../Pictures/farm1.webp'
import img2 from '../Pictures/farm2.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';


function FirstPage() {
 
  
  return (
   <div>  
       
       <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src='https://media.inmobalia.com/imgV1/B8vEv5Xh_VThvnEv3~z8uGEfZNiDVRZlAbIpBOq5vgLDOGLfGpG0_oo~5D5bHtJAWy7TqP7uYAhgtFXJkKtgmW75cmJPxt81q4rIj09bLC7bzauCxOaD5YD6D2~hVdAz1IYSKAHM8HE7.jpg' className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img2} className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item ">
      <img src='https://stronechrubie.co.nz/wp-content/uploads/2022/08/Restaurant-page-banner.jpg' className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src={img2} className="d-block w-100" alt="..."/>
     
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
   </div>
  
  )
}

export default FirstPage



