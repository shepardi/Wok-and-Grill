const express = require('express');
const router = express.Router();
const db = require('../models/Index');

//routes
//Root Route
router.get('/', function (req, res) {
    db.Slide.find({}, (error, allSlide) => {
        if (error) {
            console.log(error);
        } else {
            const context = {
                allSlide: allSlide,
                user: req.session.currentUser
            };
            res.render('index', context);
        }
    });
});

//location Route
router.get('/location', (req, res) => {
    const context = {
        user: req.session.currentUser
    };
    res.render('location', context);
});

//About us route
router.get('/aboutus', (req, res) => {
    db.Hour.find({}, (error, allHour) => {
        if (error) {
            console.log(error);
        } else {
            const context = {
                allHour: allHour,
                day: [
                    'Sunday',
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                ],
                user: req.session.currentUser
            };
            res.render('about-us', context);
        }
    });
});

module.exports = router;