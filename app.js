const express = require('express');
const router = new express.Router();
const appRoutes = require("./routes.js")


const app = express();


app.use(appRoutes);





module.exports = app;

