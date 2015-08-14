/*
* @Author: CC
* @Date:   2015-08-11 13:49:23
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 11:55:21
*/


describe('test index.js', function () {
  before(function(done) {
    this.req = require('supertest')(require('../../server').callback())
    process.nextTick(done)
  })

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