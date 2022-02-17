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


/* POST /items - this route should accept JSON data and add it to the shopping list.
Here is what a sample request/response looks like:
{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}} */
router.post("/", (req, res, next) => {
    items.push(req.body);
    return res.send(({added: req.body}));
    })

router.get("/:name", (req, res, next) => {
    let name = req.params.name;
    for(let item of items){
        if(item.name === name){
            return res.json(item)
        }
    }
    return res.send("Item not found!");

})


/* GET /items/:name - this route should display a single item’s name and price.
Here is what a sample response looks like:

{“name”: “popsicle”, “price”: 1.45} */



/* PATCH /items/:name, this route should modify a single item’s name and/or price.
Here is what a sample request/response looks like:
{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}} */

router.patch("/:name", (req, res, next) => {
    let name = req.params.name;
    for(let item of items){
        if(item.name === name){
            item.name = req.body.name;
            item.price = req.body.price;
            return res.json({updated: item})
        }
    }
    return res.send("Item not found!");

})


/* DELETE /items/:name - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

{message: “Deleted”} */

router.delete("/:name", (req, res, next) => {
    let name = req.params.name;
    for(let item of items){
        if(item.name === name){
            let idx = items.indexOf(item);
            items.splice(idx, 1);
            return res.json({message:"Deleted"})
        }
    }
    return res.send("Item not found!");

})
module.exports = router;
