const express = require('express');
const appRoutes = require("./routes");
const ExpressError = require('./expressError');

/* Initialize express */
const app = express();

/* Middleware: configures express so that the incoming data is added to the request object's body properly*/
app.use(express.json());


/* Apply a prefix of "items" to every route, and adds the route handlers in appRoutes to app  */
app.use('/items', appRoutes);

/* Catch not found routes and pass the error to the Global Error Handler */
app.use((req, res, next) => {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError);
})


/* Global Error Handler.*/
app.use((err, req, res, next) => {
    /*  Set default status code for errors 500 (generic internal server error). */
    let status = err.status || 500;
    let message = err.message;
    /* set the status of the response and alert the user with json format */
    return res.status(status).json({
        error: {message, status}
    })
})


module.exports = app;

