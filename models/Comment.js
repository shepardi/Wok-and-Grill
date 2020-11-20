/* Bring in Mongoose */
const mongoose = require('mongoose');

/* Set up Schema */
const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image:{
        type: String
    }

});



/* set up model */
const Comment = mongoose.model('Comment', commentSchema);

/* exports model */
module.exports = Comment;