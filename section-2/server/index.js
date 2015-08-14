/*
* @Author: CC
* @Date:   2015-08-10 17:42:08
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 13:59:06
*/
'use strict'

const path = require('path')
const config = require('./config')
const app = require('koa')()
const router = require('./apis')(require('koa-router')())
const jwt = require('koa-jwt')({ secret: config.jwtSecret }).unless({
  path: [
    /^\/api\/auth/,
    /^\/favicon\.ico/,
  ]
})

global.debug = process.env.NODE_ENV === 'dev'

require('./models/init')

app
  .use(handleError)
  .use(require('koa-static')(config.assetsDir))
  .use(jwt)
  .use(require('koa-body')({ formidable: { uploadDir: config.uploadDir } }))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(config.port, function() {
    console.log('listening on', config.port)
  })

module.exports = app

function *handleError(next) {
  try {
    yield next
  } catch(e) {
    this.status = e.status || /* istanbul ignore next */ 500
    switch (e.status) {
      case 400:
        this.body = e
        break
      /* istanbul ignore next */
      default:
        this.body = e.message
    }
    this.app.emit('error', e, this)
  }
}