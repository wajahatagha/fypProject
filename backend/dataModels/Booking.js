const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    ownerId: String,
    userId: String,
    venueId: {type: mongoose.Schema.Types.ObjectId, ref:'Venue'},
    Price: Number,
    title: String,
    category: String,
    // bookingDateDay: [String],
    // bookingDateNight: [String],
    bookingDayDate: String,
    bookingNightDate: String,
    approval: Boolean  
}); 

const bookingModel = mongoose.model('Booking', BookingSchema);

module.exports = bookingModel; 

