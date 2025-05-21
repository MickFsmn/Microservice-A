const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
     mediaType: { type: String, enum: ['photo', 'video'], required: true },
     dateUploaded: { type: Date, default: Date.now },
     dateTaken: { type: Date, required: true },
     band: { type: String, required: true },
     title: { type: String },
     description: { type: String },
     location: { type: String },
     mediaPath: { type: String, required: true },
     uploadedBy: { type: String } // optional: user who uploaded
});

module.exports = mongoose.model('Media', mediaSchema);
