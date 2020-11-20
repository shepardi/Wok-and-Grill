const express = require('express');
const router = express.Router();
const db = require('../models/Index');

//routes

//update route
router.put('/:index', (req, res) => {
    db.Slide.findByIdAndUpdate(
        req.params.index,
        req.body, {
            new: true
        },
        (error, updatedMenu) => {
            if (error) {
                console.log(error);
            } else {
                res.redirect(`/admin`);
            }
        }
    );
});

module.exports = router;