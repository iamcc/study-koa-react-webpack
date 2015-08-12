/*
* @Author: CC
* @Date:   2015-08-12 10:14:18
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 10:39:46
*/

import Actions from '../actions'

exports.handleError = e => {
  e && e.response.status === 401 && Actions.logout()
}