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
//connect to the mongo
const MongoClient = require("mongodb").MongoClient;
//create database instance
let database;
//connect to cluster
MongoClient.connect("mongodb+srv://kido:kido@cluster0.ustub.mongodb.net",(err, cli) => {
    //connect to the database
    database = cli.db("afterschool");
});
//make the collection name a parameter
app.param("collName", (request, response, next, collName) => {
    request.collection = database.collection(collName);
    console.log("collection name:", request.collection);
    return next();
});
