// import React , { useState }from 'react'
// import { Link } from 'react-router-dom'
// import Head from '../Head'
// import img1 from '../Pictures/farm1.webp'
// import img2 from '../Pictures/farm2.jpg'
// import img3 from '../Pictures/search2.png'
// import img4 from '../Pictures/book.webp'
// import img5 from '../Pictures/add.png'
// import img6 from '../Pictures/beach2.jpg'
// import img7 from '../Pictures/wedd.avif'
// import img8 from '../Pictures/farm3.jpg'
// import img9 from '../Pictures/wat.jpg'

// // import 'bootstrap/dist/css/bootstrap.min.css';
// import Carousel from 'react-bootstrap/Carousel';


// function FirstPage() {
   
  
//   return (
//     <>
//     {/* <div>  
//           <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
//             <div className="carousel-indicators">
//               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
//               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
//               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              
//               <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
//             </div>
//             <div className="carousel-inner">
//               <div className="carousel-item active">
//                 <img src={img9} className="d-block w-100" alt="..."/>
//                 <h1 className='text-black'>BOOK KRO</h1>
//               </div>
//               <div className="carousel-item">
//                 <img src={img6} className="d-block w-100" alt="..."/>
//                 <h1 className='text-black'>BEACH HUTS</h1>
//               </div>
//               <div className="carousel-item ">
//                 <img src={img8} className="d-block w-100" alt="..."/>
//                 <h1 className='text-black'>FARM HOUSES</h1>
               
//               </div>
//               <div className="carousel-item">
//                 <img src={img7} className="d-block w-100" alt="..."/>
//                 <h1 className='text-black'>WEDDING HALLS</h1>
              
//               </div>
//             </div>
//             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
//               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//               <span className="visually-hidden">Previous</span>
//             </button>
//             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
//               <span className="carousel-control-next-icon" aria-hidden="true"></span>
//               <span className="visually-hidden">Next</span>
//             </button>
//         </div>
//    </div> */}
// <div className='flex m-6 items-center justify-center '>
// <Link className='p-3 text-3xl font-bold bg-purple-700 text-white rounded-xl ' to={'/ads'}>Browse Venues</Link>
// </div>
// <Carousel data-bs-theme="dark">
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={img9}
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h1 className='text-black text-9xl font-bold py-30'>BOOK KRO</h1>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={img6}
//           alt="Second slide"
//         />
//         <Carousel.Caption>
//           <h1 className='text-black text-9xl font-bold py-30'>BEACH HUTS</h1>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={img8}
//           alt="Third slide"
//         />
//         <Carousel.Caption>
//         <h1 className='text-black text-9xl font-bold py-30'>FARM HOUSES</h1>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src={img7}
//           alt="Third slide"
//         />
//         <Carousel.Caption>
//         <h1 className='text-black text-9xl font-bold py-30'>WEDDING HALLS</h1>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>

//    <section className="services">
//       <h1 className='heading-title font-bold'>Our Services</h1>
//       <div className="box-container">
//         <div className="box">
//           <img src={img3} alt="" />
//           <h3 className='font-bold'>Use filtered search for desired venue</h3>
//         </div>

//         <div className="box">
//           <img src={img4} alt="" />
//         <h3 className='font-bold'>Book Venues using Scheduling and rate them!</h3>
//         </div>

//         <div className="box">
//           <img src={img5} alt="" />
//           <h3 className='font-bold'>Advertise your Venue</h3>
//         </div>
//       </div>
//    </section>

//    </>
  
//   )
// }

// export default FirstPage

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
import '../Home.css'

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
      <div className='image1c'>
        <div className='image1paraP'>
        <div className='childimage1paraP'>
          <p className='pakvenuetitle'><b>Pak-Venues</b></p>
        <p className="imp">Under the open sky, let your love story unfold in the serene elegance of an outdoor wedding paradise.</p>
        </div>
        </div>
        </div> 
      </Carousel.Item>
      <Carousel.Item>
        {/* <img
          className="d-block w-100"
          src={img6}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1 className='text-black text-9xl font-bold py-30'>BEACH HUTS</h1>
        </Carousel.Caption> */}
        <div className='image2c'>
        <div className='image1paraP'>
        <div className='childimage1paraP'>
        <p className='pakvenuetitle'><b>Pak-Venues</b></p>
        <p className="imp">Discover enchanting ambience <b>VENUES</b> where every moment becomes a cherished memory</p>
        </div>
        </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        {/* <img
          className="d-block w-100"
          src={img8}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h1 className='text-black text-9xl font-bold py-30'>FARM HOUSES</h1>
        </Carousel.Caption> */}
        <div className='image3c'>
        <div className='image1paraP'>
        <div className='childimage1paraP'>
        <p className='pakvenuetitle'><b>Pak-Venues</b></p>
        <p className="imp">Escape to rustic bliss as your special day unfolds amidst the charm and serenity of our picturesque farmhouse <b>VENUE</b>.</p>
        </div>
        </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        {/* <img
          className="d-block w-100"
          src={img7}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h1 className='text-black text-9xl font-bold py-30'>WEDDING HALLS</h1>
        </Carousel.Caption> */}
        <div className='image4c'>
        <div className='image1paraP'>
        <div className='childimage1paraP'>
        <p className='pakvenuetitle'><b>Pak-Venues</b></p>
        <p className="imp">Experience opulence and warm hospitality at Pakistan's finest hotels, where luxury meets tradition, creating an unforgettable stay.</p>
        </div>
        </div>
        </div>
      </Carousel.Item>
    </Carousel>
<div className='flex m-6 items-center justify-center '>
{/* <Link className='p-3 text-3xl font-bold bg-purple-700 text-white rounded-xl ' to={'/ads'}>Browse Venues</Link> */}
</div>


<div>
   <section class="py-10 bg-w sm:py-16 lg:py-24 z-40 relative">
    <div class="container mx-auto">
        <h2 class="text-3xl font-light text-center   text-black sm:text-4xl lg:text-5xl ">
            Our <span class="block w-full font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-500 lg:inline">Services
            </span>
        </h2>

        {/* <div class="grid grid-cols-1 gap-6   lg:grid-cols-3 flex justify-center items-center flex-wrap ">
            <a href="#" class=" shadow-2xl relative ">
                <div class="  h-full relative shadow-2xl shadow-green-900 overflow-hidden group ">
                    <div class=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-green-900 transition-all ease-in-out duration-500  ">
                        <div class="w-full h-full   p-5   relative">
                            <div class="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 class="text-2xl font-bold  text-white mb-0 pb-1">Standard Color</h2>
                                <p class="text-lg font-light text-white">Lorem ipsum dolor sit amet, #brands.</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://source.unsplash.com/random/400x400" class="w-full z-0  h-full    object-fill example "/>
                </div>
            </a>
            <a href="#" class=" shadow-2xl relative ">
                <div class="  h-full relative shadow-2xl shadow-green-900 overflow-hidden group ">
                    <div class=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-green-900 transition-all ease-in-out duration-500  ">
                        <div class="w-full h-full   p-5   relative">
                            <div class="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 class="text-2xl font-bold  text-white mb-0 pb-1">Standard Color</h2>
                                <p class="text-lg font-light text-white">Lorem ipsum dolor sit amet, #brands.</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://source.unsplash.com/random/400x400" class="w-full z-0  h-full    object-fill example "/>
                </div>
            </a> 
            <a href="#" class=" shadow-2xl relative ">
                <div class="  h-full relative shadow-2xl shadow-green-900 overflow-hidden group ">
                    <div class=" absolute -bottom-10 group-hover:top-0 left-0 w-full h-full group-hover:bg-green-900 transition-all ease-in-out duration-500  ">
                        <div class="w-full h-full   p-5   relative">
                            <div class="absolute bottom-0 group-hover:bottom-24 text-white  text-left   transition-all ease-in-out duration-500 ">
                                <h2 class="text-2xl font-bold  text-white mb-0 pb-1">Standard Color</h2>
                                <p class="text-lg font-light text-white">Lorem ipsum dolor sit amet, #brands.</p>
                            </div>
                        </div>
                    </div>
                    <img src="https://source.unsplash.com/random/400x400" class="w-full z-0  h-full    object-fill example "/>
                </div>
            </a>


        </div> */}

</div>
</section>
   </div>

   <div className="container mb-20">
    <div >
      <div className="row">
      <div className='cardsparent'>
      <div className="col-md-3 ch child1card">
        <div className='card1text'>
          <p className='para1'>Use filtered search for desired venue</p>
        </div>
       </div>
       <div className="col-md-3 ch3 child1card">
      <div className='card3text'>
          <p className='para3'>Advertise your Venue</p>
        </div>
      </div>
      <div className="col-md-3 card2 child1card">
      <div className='card2text'>
          <p className='para1'>Book Venues using Scheduling and rate them!</p>
        </div>
      </div>
      
      </div>
      </div>
    </div>
   </div>


   </>
  
  )
}

export default FirstPage

