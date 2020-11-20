/* External Modules */
const express = require('express');
const router = express.Router();

/* Internal Modules */
const db = require('../models/index');


/* ----- ----- ----- ----- Routes ----- ----- ----- -----*/
/* Root Route: /items */

/* item-display route */
// TODO: change render to render the menu show page by menu ID
router.get("/", async function (req, res) {
    try {
        // run code
        const allItem = await db.Item.find({});
        const context = {
            items: allItem,
            user: req.session.currentUser
        };
        res.render("items/item-index", context);
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});

/* new route */
router.get("/new", async function (req, res) {
    try {
        const allMenu = await db.Menu.find({});
        const context = {
            allMenu: allMenu,
            user: req.session.currentUser
        }
        //run code
        res.render("items/item-new", context);
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});

/* create route */
router.post("/", async function (req, res) {
    try {
        //run code
        const createItem = await db.Item.create(req.body);
        const foundMenu = await db.Menu.findById(createItem.menus);
        foundMenu.items.push(createItem);
        foundMenu.save();
        res.redirect("/admin");
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});

/* edit route */
router.get("/:id/edit", async function (req, res) {
    try {
        //run code
        const foundItem = await db.Item.findById(req.params.id);
        const context = {
            item: foundItem,
            user: req.session.currentUser
        }
        res.render("items/item-edit", context);
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});

/* update route */
router.put("/:id", async function (req, res) {
    try {
        //run code
        const updatedItem = await db.Item.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});

/* delete route */
router.delete("/:id", async function (req, res) {
    try {
        //run code
        const deletedItem = await db.Item.findByIdAndDelete(req.params.id);
        const foundMenu = await db.Menu.findById(deletedItem.menus);
        foundMenu.items.remove(deletedItem);
        foundMenu.save();
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
        res.send({
            message: "Internal Server Error"
        });
    }
});


/* Export Router */
module.exports = router;