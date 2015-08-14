/*
* @Author: CC
* @Date:   2015-08-11 14:31:51
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 11:55:59
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
    it('will get 用户名不能空', function (done) {
      this
        .login({})
        .expect(400)
        .expect(/用户名不能空/)
        .end(done)
    })

    it('will get 密码不能空', function (done) {
      this
        .login({ username: 'admin' })
        .expect(400)
        .expect(/密码不能空/)
        .end(done)
    })

    it('will get 用户名不存在', function (done) {
      this
        .login({ username: 'notexist', password: 'notexist' })
        .expect(400)
        .expect(/用户名不存在/)
        .end(done)
    })

    it('will get 密码错误', function (done) {
      this
        .login({ username: 'admin', password: 'wrong' })
        .expect(400)
        .expect(/密码错误/)
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