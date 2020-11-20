const express = require('express');
const router = express.Router();
const db = require('../models/Index')

router.get('/', async function (req, res) {
    try {
        const allMenu = await db.Menu.find({}).populate("items");
        const allComment = await db.Comment.find({});
        const allHour = await db.Hour.find({});
        const allSlide = await db.Slide.find({});
        const context = {
            allMenu: allMenu,
            allComment: allComment,
            allHour: allHour,
            day: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ],
            allSlide: allSlide,
            user: req.session.currentUser
        };
        res.render('admin/index', context);
    } catch {
        console.log(error);
    }
});

module.exports = router;