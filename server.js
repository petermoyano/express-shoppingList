/* I will start the server on this File, separated from app.js, so I avoid launching a server 
when I import app into the tests files, thus enablig supertest to run its own server for testing */

const app = require("./app");
app.listen(3000, function () { console.log("App on port 3000") });
