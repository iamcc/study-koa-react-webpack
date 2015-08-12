/*
* @Author: CC
* @Date:   2015-08-11 18:47:05
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 10:34:05
*/

import $ from 'superagent'

export default {
  login
}

function login(user) {
  return $.post('/api/auth/login').send(user)
}