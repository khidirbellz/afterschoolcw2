//import express from node modules
const exp = require("express");
// make express app
const app = exp();
//use express
app.use(exp.json());
//tell express where to get html clss and jss files
app.use(exp.static('public'));
//use the https headers
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Headers",'Origin,X-requested-With,Content-Type,Accept');
    response.setHeader('Access-Control-Allow-Methods','PUT');
    response.setHeader("Access-Control-Allow-Origin", "*")
    next();
});
