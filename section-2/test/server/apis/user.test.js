/*
* @Author: CC
* @Date:   2015-08-14 10:45:32
* @Last Modified by:   CC
* @Last Modified time: 2015-08-17 16:36:45
*/

const jwt = require('koa-jwt')
const config = require('../../../server/config')
const UserModel = require('../../../server/models/user')
const pedding = require('pedding')
const should = require('should')
const ObjectId = require('mongoose').Types.ObjectId
var adminUser, adminToken, salesUser, salesToken, notexistToken

describe('test user api', function () {
  before(function(done) {
    done = pedding(2, done)
    this.req = require('supertest')(require('../../../server').callback())
    notexistToken = 'Bearer ' + jwt.sign({username: 'notexist'}, config.jwtSecret)
    UserModel.create({username: 'sales', password: '123456'}, function(e, user) {
      UserModel.findByUsername('admin').then(function(user) {
        adminUser = user
        adminToken = 'Bearer ' + jwt.sign(user, config.jwtSecret)
        done()
      }, done)
      UserModel.findByUsername('sales').then(function(user) {
        salesUser = user
        salesToken = 'Bearer ' + jwt.sign(user, config.jwtSecret)
        done()
      }, done)
    })
  })

  after(function(done) {
    UserModel.remove({username: 'sales'}, done)
  })

  describe('GET /api/user', function () {
    it('will get a user list', function (done) {
      this.req
        .get('/api/user')
        .set('Authorization', adminToken)
        .expect(200)
        .end(function(e, res) {
          res.body.should.have.a.property('data')
          res.body.should.have.a.property('total')
          res.body.total.should.above(0)
          done(e)
        })
    })
  })

  describe('DEL /api/user', function () {
    it('will get 403 with sales token', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', salesToken)
        .expect(403, done)
    })

    it('will get 404 without id', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', adminToken)
        .expect(404, done)
    })

    it('will get 500 for send a invalid objectid', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', adminToken)
        .query({id: 'notexist'})
        .expect(500, done)
    })

    it('will get 404 with not exist id', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', adminToken)
        .query({id: ObjectId()})
        .expect(404, done)
    })

    it('will get 403 for del admin', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', adminToken)
        .query({id: adminUser._id.toString()})
        .expect(403, done)
    })

    it('will get 200', function (done) {
      this.req
        .del('/api/user')
        .set('Authorization', adminToken)
        .query({id: salesUser._id.toString()})
        .expect(200)
        .end(function(e, res) {
          UserModel.findById(salesUser._id, function(e, user) {
            should.not.exist(e)
            user.should.be.ok()
            user.deleted.should.be.true()
            user.deleted = false
            user.save(done)
          })
        })
    })
  })

  describe('PUT /api/user?act=updatePassword', function () {
    it('will get 400 `at least 6 characters` without oldPwd', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({})
        .expect(400)
        .expect(/at least 6 characters/, done)
    })

    it('will get 400 `at least 6 characters` with oldPwd 111', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({oldPwd: 111})
        .expect(400)
        .expect(/at least 6 characters/, done)
    })

    it('will get 400 `at least 6 characters` without newPwd', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({})
        .expect(400)
        .expect(/at least 6 characters/, done)
    })

    it('will get 400 `at least 6 characters` with newPwd 111', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({newPwd: 111})
        .expect(400)
        .expect(/at least 6 characters/, done)
    })

    it('will get 404 `not exist` with fake notexist token', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', notexistToken)
        .query({act: 'updatePassword'})
        .send({oldPwd: '111111', newPwd: '222222'})
        .expect(404)
        .expect(/not exist/, done)
    })

    it('will get 400 `invalid password` with wrong oldPwd', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({oldPwd: '111111', newPwd: '222222'})
        .expect(400)
        .expect(/invalid password/, done)
    })

    it('will get 200', function (done) {
      this.req
        .put('/api/user')
        .set('Authorization', salesToken)
        .query({act: 'updatePassword'})
        .send({oldPwd: '123456', newPwd: '111111'})
        .expect(200, done)
    })
  })

  describe('PUT /api/user?act=updateStatus', function () {
    const url = '/api/user?act=updateStatus'

    it('will get 403 with sales token', function (done) {
      this.req
        .put(url)
        .set('Authorization', salesToken)
        .expect(403, done)
    })

    it('will get 404 without id', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .expect(404, done)
    })

    it('will get 404 with not exist id', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: ObjectId()})
        .expect(404, done)
    })

    it('will get 403 for update admin`s status', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: adminUser._id.toString()})
        .expect(403, done)
    })

    it('will get 400 `invalid status`', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: salesUser._id.toString()})
        .expect(400, done)
    })

    it('will get 200', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: salesUser._id.toString(), status: 1})
        .expect(200, done)
    })
  })

  describe('PUT /api/user?act=resetPassword', function () {
    const url = '/api/user?act=resetPassword'

    it('will get 403 without admin token', function (done) {
      this.req
        .put(url)
        .set('Authorization', salesToken)
        .expect(403, done)
    })

    it('will get 404 without id', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .expect(404, done)
    })

    it('will get 404 with not exist id', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: ObjectId()})
        .expect(404, done)
    })

    it('will get 403 for reset admin`s password', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: adminUser._id.toString()})
        .expect(403, done)
    })

    it('will get 200 for reset password to 123456', function (done) {
      this.req
        .put(url)
        .set('Authorization', adminToken)
        .send({id: salesUser._id.toString()})
        .expect(200, function(e, res) {
          UserModel.findById(salesUser._id, function(e, user) {
            user.comparePassword('123456').should.be.true()
            done(e)
          })
        })
    })
  })

  describe('POST /api/user', function () {
    it('will get 403 without admin token', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', salesToken)
        .expect(403, done)
    })

    it('will get 400 for create user without password', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', adminToken)
        .send({username: 'nopassword', role: 'sales'})
        .expect(400, done)
    })

    it('will get 400 user existed for create the username of admin', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', adminToken)
        .send({username: 'admin', password: '123456', role: 'sales'})
        .expect(400)
        .expect(/existed/, done)
    })

    it('will get 400 `should be at least 3 characters` for create sales named cc', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', adminToken)
        .send({username: 'cc', password: '123456', role: 'sales'})
        .expect(400)
        .expect(/should be at least 3 characters/, done)
    })

    it('will get 400 `invalid role` for create sales with the invalid role', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', adminToken)
        .send({username: 'cc', password: '123456', role: 'invalidrole'})
        .expect(400)
        .expect(/invalid role/, done)
    })

    it('will get 200 for create sales named ccc', function (done) {
      this.req
        .post('/api/user')
        .set('Authorization', adminToken)
        .send({username: 'ccc', password: '123456', role: 'sales'})
        .expect(200)
        .end(function(e, res) {
          res.body.username.should.be.eql('ccc')
          res.body.role.should.be.eql('sales')
          done(e)
        })
    })
  })
})