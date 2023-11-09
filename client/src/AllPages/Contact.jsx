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
                    <div className='box'>
                    <a href="#"><i className="fas fa-phone"></i>+92342-2345527</a>
                    <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=AVQVeyy34Dm5o-3FDaz1HMtFfOtBuQ40a1D9vdQOj9OFxgfaytx4nkL8Tek6sYAmYScrT5Dqs7XijQ&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1326163710%3A1699006243741918&theme=glif"><i className="fas fa-envelope"></i>pak-venues@gmail.com</a>
                    <a href="https://www.facebook.com/campaign/landing.php?campaign_id=1653377901&extra_1=s%7Cc%7C318307045126%7Ce%7Cfacebook%27%7C&placement=&creative=318307045126&keyword=facebook%27&partner_id=googlesem&extra_2=campaignid%3D1653377901%26adgroupid%3D65139789042%26matchtype%3De%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-362360550869%26loc_physical_ms%3D1011081%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=EAIaIQobChMI_qO10MunggMVAT8GAB3OaAQ3EAAYASAAEgK5EvD_BwE"><i className="fab fa-facebook-f"></i>Facebook</a>
                    <a href="https://www.instagram.com/"><i className="fab fa-instagram"></i>Instagram</a>
                    <a href="https://www.snapchat.com/"><i className="fab fa-snapchat"></i>Snapchat</a>
                    <a href="https://twitter.com/?lang=en"><i className="fab fa-twitter"></i>Twitter</a>
                </div>
            </div>
        </div>
    
    </>
  )
}
