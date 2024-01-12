const nodemailer = require("nodemailer");
const EMAIL = process.env.EMAIL;
const PASS = process.env.PASS;
const Mailgen = require('mailgen');

const getBill =async (req, res,next) => {
    const {subject, message, contactNum, name, email} = req.body 
    let defaultsetting = {
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS
        }
    };
// yahn humne ek variable bana h or usme humne nodemailer ki library k through 
// transport banai h k email jo send hogi uski details defaultsetting me hai 
    let transporter = nodemailer.createTransport(defaultsetting);
// ye email k template ko generate krta hai
    let Mailgenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Pak-Venues',
            // is link me apni website k link dena hai 
            link: 'https://sheheryarkhan.com'
        }
    });

    // creating gmail format 
    let htmlBody = `
    <div style="width: 100%; background-color: rgba(211, 209, 209, 0.373); padding: 20px; font-family: sans-serif; text-align: center;">
    <h2>Pak Venues</h2>
</div>
<div style="padding: 10px;">
    <p style="color: #666; background-color: #fff; padding: 10px; border-radius: 5px;">Message: ${message}</p>
    <p style="color: #666;  padding: 10px; border-radius: 5px;">User Email: ${email}</p>
    <p style="color: #666; background-color: #fff; padding: 10px; border-radius: 5px;">Contact Number: ${contactNum}</p>
</div>
<div style="width: 100%; background-color: rgba(211, 209, 209, 0.373); padding: 20px; font-family: sans-serif; text-align: center;">
    <p style="font-size: 12px; color: #b0afaf;">since 2022 <a href="pakvenues" style="font-style: italic; padding: 5px;">pak-venues</a> <span style="color: #b0afaf; font-size: 12px;">All rights reserved</span></p>
</div>
  `;

    let response = {
        body: {
            name: name,
            intro: message,
        }
    };
    
// email k template me humne data ko set kara h jo humne bhejna hai
    let mail = Mailgenerator.generate(response);

    let Umessage = {
        from: EMAIL,
        to: 'wajahat.agha29@gmail.com',
        subject:subject,
        // ye sirf email me mail word ko send kr rahi 
        // html: "mail",
        // or ye ek proper template k sath mail bhj rahi hai
        html: htmlBody
    };
// library k through mail ko send kr rahe hn
    transporter.sendMail(Umessage)
        .then(() => {
            res.status(203).json("msg sent");
            console.log('msg sent')
        })
        .catch(err => {
            res.status(403).json(err); 
            console.log(err)
        });
        next();
    //yahn hum ye set kr rahe hn k by default jo mail send hogi wo kahn se hogi
    
};

module.exports = {  getBill };