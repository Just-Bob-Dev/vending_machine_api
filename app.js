const express = require('express');
const mocha = require('mocha');



var app = express();









if(require.main === "module"){
  app.listen(3000, function(){
    console.log('Express running on http://localhost:3000/.');
  })
}
