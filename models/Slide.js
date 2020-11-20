/* Bring in Mongoose */
const mongoose = require('mongoose');

/* Set up Schema */
const slideSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});



/* set up model */
const Slide = mongoose.model('Slide', slideSchema);

/* exports model */
module.exports = Slide;