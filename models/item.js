/* Bring in Mongoose */
const mongoose = require("mongoose");

/* Set up Schema */
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    spicy: {
        type: Number
    },
    menus: [{
        type: mongoose.Schema.Types.ObjectId, // accept id's only
        ref: 'Menu' // accept id's from Menu
    }]
});
/* Set up model */
const Item = mongoose.model("Item", itemSchema);

/* Exports model */
module.exports = Item;