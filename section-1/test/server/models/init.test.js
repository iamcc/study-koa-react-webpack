/*
* @Author: CC
* @Date:   2015-08-11 14:57:09
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 09:09:47
*/

const should = require('should')

before(function(done) {
  require('../../../server')
  process.nextTick(done)
})

describe('test model init', function () {
  it('callback will not get error', function (done) {
    require('../../../server/models/init')(function(e) {
      should.not.exist(e)
      done(e)
    })
  })
})