import React , { useState }from 'react'
import { Link } from 'react-router-dom'
import Head from '../Head'
import img1 from '../Pictures/farm1.webp'
import img2 from '../Pictures/farm2.jpg'
import img3 from '../Pictures/search2.png'
import img4 from '../Pictures/book.webp'
import img5 from '../Pictures/add.png'
import img6 from '../Pictures/beach2.jpg'
import img7 from '../Pictures/wedd.avif'
import img8 from '../Pictures/farm3.jpg'
import img9 from '../Pictures/wat.jpg'

// import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


function FirstPage() {
   
  
  return (
    <>
    {/* <div>  
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={img9} className="d-block w-100" alt="..."/>
                <h1 className='text-black'>BOOK KRO</h1>
              </div>
              <div className="carousel-item">
                <img src={img6} className="d-block w-100" alt="..."/>
                <h1 className='text-black'>BEACH HUTS</h1>
              </div>
              <div className="carousel-item ">
                <img src={img8} className="d-block w-100" alt="..."/>
                <h1 className='text-black'>FARM HOUSES</h1>
               
              </div>
              <div className="carousel-item">
                <img src={img7} className="d-block w-100" alt="..."/>
                <h1 className='text-black'>WEDDING HALLS</h1>
              
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
   </div> */}


<Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img9}
          alt="First slide"
        />
        <Carousel.Caption>
          <h1 className='text-black text-9xl font-bold py-30'>BOOK KRO</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img6}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1 className='text-black text-9xl font-bold py-30'>BEACH HUTS</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img8}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h1 className='text-black text-9xl font-bold py-30'>FARM HOUSES</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img7}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h1 className='text-black text-9xl font-bold py-30'>WEDDING HALLS</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

   <section className="services">
      <h1 className='heading-title font-bold'>Our Services</h1>
      <div className="box-container">
        <div className="box">
          <img src={img3} alt="" />
          <h3 className='font-bold'>Search Venues</h3>
        </div>

        <div className="box">
          <img src={img4} alt="" />
          <h3 className='font-bold'>Book Venues</h3>
        </div>

        <div className="box">
          <img src={img5} alt="" />
          <h3 className='font-bold'>Add Venues</h3>
        </div>
      </div>
   </section>

   </>
  
  )
}

export default FirstPage



