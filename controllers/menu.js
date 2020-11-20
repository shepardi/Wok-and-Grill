const express = require('express');
const router = express.Router();
const db = require('../models/Index');
const adminRequired = require('../middleware/adminRequire');
//routes

//index route
router.get('/', (req, res) => {
  db.Menu.find({}, (error, allMenu) => {
    if (error) {
      console.log(error);
    } else {
      const context = {
        allMenu: allMenu,
        user: req.session.currentUser
      };
      res.render('menu/index', context);
    }
  });
});

//new route
router.get('/new', adminRequired, (req, res) => {
  const context = {
    user: req.session.currentUser
  };
  res.render('menu/new', context);
});

//create route
router.post('/', (req, res) => {
  db.Menu.create(req.body, (error, addedMenu) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/admin');
    }
  });
});

//Show route
router.get('/:index', (req, res) => {
  db.Menu.findById(req.params.index).populate("items").exec(
    function (error, foundMenu) {
      if (error) {
        console.log(error);
      } else {
        const context = {
          foundMenu: foundMenu,
          user: req.session.currentUser
        };
        res.render('menu/show', context);
      }
    })
});

//edit route
router.get('/:index/edit', adminRequired, (req, res) => {
  db.Menu.findById(req.params.index, (error, editedMenu) => {
    if (error) {
      console.log(error);
    } else {
      const context = {
        editedMenu: editedMenu,
        user: req.session.currentUser
      };
      res.render('menu/edit', context);
    }
  });
});

//update route
router.put('/:index', (req, res) => {
  db.Menu.findByIdAndUpdate(
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

//delete route
router.delete('/:index', (req, res) => {
  db.Menu.findByIdAndDelete(req.params.index, (error, deletedMenu) => {
    if (error) {
      console.log(error);
    } else {
      db.Item.remove({
        _id: {
          $in: deletedMenu.items
        }
      }, function (error, removedItems) {
        if (error) {
          console.log(error);
        } else {
          res.redirect('/admin');
        }
      });
    }
  });
});
module.exports = router;