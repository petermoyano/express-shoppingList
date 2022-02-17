/* We will store all of our routes separated from app.js to make it more readable */

/* We don't really use express in this file, other than to get the router object, on which we can define
 our routes on */
const express = require("express");
const router = new express.Router();

const items = require("./fakeDb");
const ExpressError = require("./expressError");

/* 
GET /items - this should render a list of shopping items.
Here is what a response looks like:
[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]*/
router.get("/", (req, res, next) => {
    return res.json(items);
})


/* Custom error when item is not complete or already exists */
router.post("/", (req, res, next) => {
    try {
        if (!req.body.name || !req.body.price) {
            throw new ExpressError("Item must have a valid name and price", 400)
        }
        for (let item of items) {
            if (req.body.name === item.name) {
                throw new ExpressError("Item already exists.", 400)
            }
        }
        items.push(req.body);
        return res.status(201).json(({ added: req.body }));
    }
    catch (err) {
        return next(err)
    }
})
/* Custom error for item not found */
router.get("/:name", (req, res, next) => {
    let name = req.params.name;
    try {
        for (let item of items) {
            if (item.name === name) {
                return res.json(item)
            }
        }
        throw new ExpressError("Item not found.", 404);
    }
    catch (err) {
        return next(err);
    }


})


/* Custom errors for editing an item with a name that already exists, and editing an item that doesn't exists */
router.patch("/:name", (req, res, next) => {
    try {
        let newName = req.body.name;
        for (let item of items) {
            if (item.name === newName) {
                throw new ExpressError("An item with that name already exists", 400);
            }
        }
        let name = req.params.name;
        for (let item of items) {
            if (item.name === name) {
                item.name = req.body.name;
                item.price = req.body.price;
                return res.json({ updated: item })
            }
        }
        throw new ExpressError("Item not found. To create a new element use a POST request", 404);
    }
    catch (err) {
        return next(err);
    }
})

/* Custom error for item not found */
router.delete("/:name", (req, res, next) => {
    let name = req.params.name;
    try {
        for (let item of items) {
            if (item.name === name) {
                let idx = items.indexOf(item);
                items.splice(idx, 1);
                return res.json({ message: "Deleted" })
            }
        }
        throw new ExpressError("Item not found.", 404)
    } catch (err) {
        return next(err)
    }
})
module.exports = router;
