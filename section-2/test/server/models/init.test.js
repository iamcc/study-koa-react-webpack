/*
* @Author: CC
* @Date:   2015-08-11 14:57:09
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 11:55:34
*/

const should = require('should')

describe('test model init', function () {
  before(function(done) {
    require('../../../server')
    process.nextTick(done)
  })

  it('callback will not get error', function (done) {
    require('../../../server/models/init')(function(e) {
      should.not.exist(e)
      done(e)
    })
  })
})