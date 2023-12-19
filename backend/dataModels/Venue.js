const mongoose = require('mongoose')

const VenueSchema = new mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    category: String,
    title: String,
    address: String,
    existingPhotos: [String],
    description: String,
    amenities: [String],
    addInfo: String,
    timeFrom: Number,
    timeTo: Number,
    capacity: Number,
    dayPrice: Number,
    nightPrice: Number
});;

const venueModel = mongoose.model('Venue', VenueSchema);

module.exports = venueModel; 

