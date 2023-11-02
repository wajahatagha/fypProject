const mongoose = require('mongoose')

const VenueSchema = new mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
    category: String,
    title: String,
    address: String,
    photos: [String],
    description: String,
    amenities: [String],
    addInfo: String,
    bookDate: Number,
    capacity: Number,
});;

const venueModel = mongoose.model('Venue', VenueSchema);

module.exports = venueModel; 
