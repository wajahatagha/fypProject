const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    ownerId: String,
    userId: String,
    Price: Number,
    title: String,
    category: String,
    approval: Boolean 
}); 

const bookingModel = mongoose.model('Booking', BookingSchema);

module.exports = bookingModel; 

