/* Bring in Mongoose */
const mongoose = require('mongoose');

/* Set up Schema */
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    items: [{
        //only accept ids
        type: mongoose.Schema.Types.ObjectId,
        //specific for Item collection
        ref: 'Item'
    }]
});

/* set up model */
const Menu = mongoose.model('Menu', menuSchema);

/* exports model */
module.exports = Menu;