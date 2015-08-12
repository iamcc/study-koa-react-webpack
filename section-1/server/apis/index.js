/*
* @Author: CC
* @Date:   2015-08-11 12:32:38
* @Last Modified by:   CC
* @Last Modified time: 2015-08-11 14:15:52
*/
'use strict'

module.exports = function(router) {
  require('./auth')(router)

  return router
}