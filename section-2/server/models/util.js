/*
* @Author: CC
* @Date:   2015-08-13 19:09:05
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 09:16:58
*/

exports.getPage = function *(Model, params) {
  const page = params.page || 1
  const limit = params.limit || 10
  const filter = params.filter || {}
  const sorter = params.sorter || '-_id'
  const offset = (page - 1) * limit
  return {
    data: yield Model.find(filter).sort(sorter).skip(offset).limit(limit).exec(),
    total: yield Model.count(filter).exec()
  }
}