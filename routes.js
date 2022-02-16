/* We will store all of our routes separated from app.js to make it more readable */
const app = require("./app");
const express = require("express");
const router = new express.Router();
const items = require("./fakeDb");

/* 
GET /items - this should render a list of shopping items.
Here is what a response looks like:

[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}] */



/* POST /items - this route should accept JSON data and add it to the shopping list.
Here is what a sample request/response looks like:

{“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}} */



/* GET /items/:name - this route should display a single item’s name and price.
Here is what a sample response looks like:

{“name”: “popsicle”, “price”: 1.45} */



/* PATCH /items/:name, this route should modify a single item’s name and/or price.
Here is what a sample request/response looks like:

{“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}} */



/* DELETE /items/:name - this route should allow you to delete a specific item from the array.

Here is what a sample response looks like:

{message: “Deleted”} */
module.exports = {router}
