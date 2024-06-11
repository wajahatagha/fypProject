const mongoose = require('mongoose')

const VenueSchema = new mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    ownerName: String,
    ownerContact: Number,
    category: String,
    title: String,
    address: String,
    existingPhotos: [String],
    description: String,
    amenities: [String],
    addInfo: String,
    timeFrom: String,
    timeTo: String,
    capacity: Number,
    dayPrice: Number,
    nightPrice: Number,
    bookingDateDay: [String],
    bookingDateNight: [String],
});

const venueModel = mongoose.model('Venue', VenueSchema);

module.exports = venueModel; 

