const mongoose = require('mongoose')



const RatingSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    userName: String,
    venueID: {type: mongoose.Schema.Types.ObjectId, ref:'Venue'},
    bookingID: {type: mongoose.Schema.Types.ObjectId, ref:'Booking'},
    stars: Number,
    text: String,
})

const RatingModel = mongoose.model('Rating', RatingSchema)

module.exports = RatingModel;