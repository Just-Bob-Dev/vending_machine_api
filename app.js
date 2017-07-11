const express = require('express');
const mocha = require('mocha');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Item = require('./models/item')
const apiRouter = require('./router/api');
const bodyParser = require('body-parser');
// Replace "test" with your database name.
// mongoose.connect('mongodb://localhost:27017/test');
// var db = mongoose.connection;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Item.create({
//   id: 2,
//   description: "Gum",
//   cost: 35,
//   quantity: 3
// })

app.use('/api', apiRouter);


if(require.main === "module"){
  app.listen(3000, function(){
    console.log('Express running on http://localhost:3000/.');
  })
}


module.exports = app;
