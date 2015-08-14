/*
* @Author: CC
* @Date:   2015-08-12 10:14:18
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 11:46:57
*/

import AuthAction from '../actions/AuthAction'

exports.handleError = e => {
  e && e.response.status === 401 && AuthAction.logout()
}