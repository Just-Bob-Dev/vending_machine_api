const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const router = require('../router/api');
const bodyParser = require('body-parser');
const Item = require('../models/item.js');

before('connect to Mongo', function(done){
  mongoose.connect('mongodb://localhost:27017/test').then(done);
});

after('drop database', function(done){
  mongoose.connection.dropDatabase(done);
})

describe('Item', function(){
  beforeEach('delete all Items', function(done){
    Item.deleteMany({}).then(function(){
      done()
    }).catch(done);
  });
  it('can create new Items in database', function(done){
    Item.create(
      {
        description: "Gum",
        cost: 35,
        quantity: 3
      },
      // {
      //   description: "Corn Chips",
      //   cost: 65,
      //   quantity: 4
      function(err, item){
        if(err) {
          done(err)
        } else {
          console.log(item);
          assert(item)
          done();
        }
    });
  });
})

let testItemId = '';

describe('GET /api/customer/items', function(){
  it('should return a list of all availible items.', function(done){
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(function(res){
        let testItemId = res.body['data'][0]['_id'];
        console.log(testItemId);
        let test = {
          "status":'success',
          "data": [
          [
          {
            '__id':res.body['data'][0]['_id'],
            'description': 'Gum',
            'cost': 35,
            '__v': res.body['data'][0]['__v']
           }
          // {
          //   '_id':res.body['data'][1]['_id'],
          //   'description': 'Corn Chips',
          //   'cost': 65,
          //   '__v': res.body['data'][1]['__v']
          // }
          ]
        ]
        }
        assert.equal(JSON.stringify(res.body), JSON.stringify(test));
      })
      .end(done);
  })
})

describe('POST /api/customer/items/:itemId/purchases', function(){
  it('Should allow a customer to purchase a product.', function(done){
    request(app)
      .post('/api/customer/' + testItemId + '/purchases')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .send({"money_given": 35})
      .expect(function(res){
        assert(res.body({
          status: 'success',
          data: {
            'money_given': 35,
            'money_required': 35
          }
        }))
      })
  })
})
