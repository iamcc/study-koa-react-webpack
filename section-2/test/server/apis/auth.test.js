/*
* @Author: CC
* @Date:   2015-08-11 14:31:51
* @Last Modified by:   CC
* @Last Modified time: 2015-08-17 15:46:26
*/

describe('test auth api', function () {
  before(function(done) {
    this.req = require('supertest')(require('../../../server').callback())
    this.login = function(user) {
      return this.req.post('/api/auth/login').send(user)
    }
    process.nextTick(done)
  })

  describe('POST /api/auth/login', function () {
    it('will get `should not be empty`', function (done) {
      this
        .login({})
        .expect(400)
        .expect(/should not be empty/)
        .end(done)
    })

    it('will get `should not be empty`', function (done) {
      this
        .login({ username: 'admin' })
        .expect(400)
        .expect(/should not be empty/)
        .end(done)
    })

    it('will get `not exist`', function (done) {
      this
        .login({ username: 'notexist', password: 'notexist' })
        .expect(400)
        .expect(/not exist/)
        .end(done)
    })

    it('will get `invalid password`', function (done) {
      this
        .login({ username: 'admin', password: 'wrong' })
        .expect(400)
        .expect(/invalid password/)
        .end(done)
    })

    it('will success', function (done) {
      this
        .login({ username: 'admin', password: '123456' })
        .expect(200)
        .end(function(err, res) {
          const body = res.body
          const user = body.user
          body.should.have.a.property('user')
          body.should.have.a.property('token')
          user.should.not.have.a.property('password')
          user.should.not.have.a.property('__v')
          user.username.should.be.eql('admin')
          done(err)
        })
    })
  })
})