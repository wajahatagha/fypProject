import React from 'react'

export default function Contact() {
  return (
    <>
        {/* <section className="contact">
            <h1 className="heading-title font-bold">Contact Us</h1>

            <form className='contact-form'>
                <div className="flex">
                    <div className="inputbox">
                        <span>Name: </span>
                        <input type="text" placeholder='Enter your name'/>
                    </div>

                    <div className="inputbox">
                        <span>Email: </span>
                        <input type="email" placeholder='Enter your email'/>
                    </div>

                    <div className="inputbox">
                        <span>Phone: </span>
                        <input type="number" placeholder='Enter your number'/>
                    </div>

                    <div className="inputbox">
                        <span>Address: </span>
                        <input type="text" placeholder='Enter your address'/>
                    </div>

                    <div className="inputbox">
                        <span>Subject: </span>
                        <input type="text" placeholder='Enter your subject'/>
                    </div>

                    <div className="inputbox">
                        <span>Message: </span>
                        <input type="text" placeholder='Enter your message'/>
                    </div>
                </div>

                <input type="submit" value="submit" className="btn"></input>

            </form>

        </section> */}

        <div className="container">
             <h1 className="heading-title font-bold">Contact Us</h1>
        </div>

        <div className="contact-box">
            <div className="contact-left">
                <h3 className='font-bold text-xl'>Send your concerns</h3>
                <form>
                    <div className="input-row">
                        <div className="input-group">
                            <label className='font-bold'>Name</label>
                            <input type="text" placeholder='Enter Name' />
                        </div>
                        <div className="input-group">
                            <label className='font-bold'>Phone</label>
                            <input type="number" placeholder='Enter Number' />
                        </div>
                    </div>

                    <div className="input-row">
                        <div className="input-group">
                            <label className='font-bold'>Email</label>
                            <input type="email" placeholder='Enter Email' />
                        </div>
                        <div className="input-group">
                            <label className='font-bold'>subject</label>
                            <input type="text" placeholder='Enter Subject' />
                        </div>
                    </div>

                    <label className='font-bold'>Message</label>
                    <textarea rows="5" placeholder='Enter Your Message'></textarea>

                    <button type='submit' className='button'>Send</button>
                </form>

            </div>

            <div className="contact-right">
                    <h3 className='font-bold text-5xl'>Contact Us</h3>
            </div>
        </div>
    
    </>
  )
}
