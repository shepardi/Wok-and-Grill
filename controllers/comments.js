const express = require('express');
const router = express.Router();
const db = require('../models/Index');

//routes

//index route
router.get('/', (req, res) => {
    db.Comment.find({}, (error, allComments) => {
        if (error) {
            console.log(error);
        } else {
            const context = {
                allComments: allComments,
                user: req.session.currentUser,
            };
            res.render('comments', context);
        }
    });
});

//create route
router.post('/', (req, res) => {
    const colorNote = noteColor(3);
    comment = {
        name: req.session.currentUser.username,
        text: req.body.text,
        image: `images/${colorNote}`
    }
    db.Comment.create(comment, (error, addComment) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/comments');
        }
    });
});

//delete route
router.delete('/:id', (req, res) => {
    db.Comment.findByIdAndDelete(req.params.id, (error, deletedComment) => {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/admin');
        }
    })
})

//Random Sticky Note Color Selector Function
//param: numColor - number of different color sticky notes. (3 for now)
const colorArray=["sticky-note.png", "sticky-note-red.png", "sticky-note-green.png"];

const noteColor = (numColors) =>{
    let randNum = Math.floor(Math.random()*numColors);
    return colorArray[randNum];

}


module.exports = router;