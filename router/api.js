const express = require('express');
const router = express.Router();
const Item = require('../models/item')
const bodyParser = require('body-parser')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


router.get('/customer/items', function(req, res){
  Item.find().then(function(item){
      res.send(
        {
          'status': 'success',
          'data': [item]
        }
      )
    })
  })




module.exports = router;
