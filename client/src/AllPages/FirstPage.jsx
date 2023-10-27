import React from 'react'
import { Link } from 'react-router-dom'
import Head from '../Head'

function FirstPage() {
  return (
    <>
    <section className="text-gray-700 body-font"> 
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"> 
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> 
    <img className="object-cover object-center rounded" alt="venue" src="https://source.unsplash.com/600x600/?beach,farmhouse,wedding hall"/> 
    </div> <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
       <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Discover Venues for All Occasions</h1> 
       <p className="mb-8 leading-relaxed">Browse our extensive list of beaches, farmhouses, and wedding halls, perfect for hosting all your events. Start planning today and book a venue with us!</p> <div className="flex justify-center"> <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Browse Venues</button> 
       <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Contact Us</button>
        </div> </div> </div> </section> <section className="text-gray-700 body-font"> 
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"> 
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> 
        <img className="object-cover object-center rounded" alt="venue" src="https://source.unsplash.com/600x600/?beach,farmhouse,wedding hall"/> 
        </div> <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"> <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Experience a Memorable Event</h1> <p className="mb-8 leading-relaxed">At our venue booking website, we offer an unparalleled experience. We carefully select venues from across the globe, ensuring a memorable and unforgettable event for all.</p> <div className="flex justify-center"> <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Book a Venue</button> <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Learn More</button> </div> </div> </div> </section> <section className="text-gray-700 body-font"> <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center"> <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> <img className="object-cover object-center rounded" alt="venue" src="https://source.unsplash.com/600x600/?beach,farmhouse,wedding hall"/> </div> <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center"> <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Elevate Your Event</h1> <p className="mb-8 leading-relaxed">Whether it's a birthday party, corporate event, or wedding, we understand that every event is unique. Our platform offers customization options to elevate your event.</p> <div className="flex justify-center"> <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Customize Your Event</button> <button className="ml-4 inline-flex text-gray-700 bg-gray-200 border-0 py-2 px-6 focus:outline-none hover:bg-gray-300 rounded text-lg">Contact Us</button> </div> </div> </div> </section> 
    </>
  )
}

export default FirstPage



