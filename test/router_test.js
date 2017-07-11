const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const router = require('../router/api');
const bodyParser = require('body-parser');

describe('GET /api/customer/items', function(){
  it('should return a list of all availible items.', function(done){
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(function(res){
        assert.equal(res.body['status'], 'success');
      })
      .end(done);
  })
})
