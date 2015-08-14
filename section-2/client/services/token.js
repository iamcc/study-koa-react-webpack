/*
* @Author: CC
* @Date:   2015-08-12 09:14:04
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 10:00:41
*/

export default req => {
  const token = require('../stores/AuthStore').getState().token
  req.set('Authorization', `Bearer ${token}`)
  return req
}