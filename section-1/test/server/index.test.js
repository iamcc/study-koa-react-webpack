/*
* @Author: CC
* @Date:   2015-08-11 13:49:23
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 09:10:36
*/

before(function(done) {
  this.req = require('supertest')(require('../../server').callback())
  process.nextTick(done)
})

describe('test index.js', function () {
  describe('GET /', function () {
    it('will get html with status 200', function (done) {
      this.req
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .end(done)
    })
  })
})