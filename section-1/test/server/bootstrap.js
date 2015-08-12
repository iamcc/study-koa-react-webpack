/*
* @Author: CC
* @Date:   2015-08-11 13:47:46
* @Last Modified by:   CC
* @Last Modified time: 2015-08-11 14:12:14
*/

after(function() {
  require('mongoose').connection.db.dropDatabase()
})