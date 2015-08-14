/*
* @Author: CC
* @Date:   2015-08-13 18:23:03
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 18:41:35
*/

import React from 'react/addons'
import { Table, message, Popconfirm, Tooltip } from 'antd'
import { Tag } from 'antd/lib/tag'
import Admin from '../../components/Admin.jsx'
import UserService from '../../services/UserService'

class UserManagement extends React.Component {
  get columns() {
    return [
      { key: 'username', title: 'User Name', dataIndex: 'username' },
      { key: 'role', title: 'Role', dataIndex: 'role' },
      { key: 'status', title: 'Status', dataIndex: 'status', render: this.renderStatus.bind(this) },
      { key: 'actions', title: this.renderActionTitle(), dataIndex: '_id', render: this.renderActions.bind(this) }
    ]
  }

  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      pagination: {
        onChange: page => {
          this.loadData({page})
        }
      }
    }
  }

  componentWillMount() {
    this.loadData()
  }

  render() {
    return (
      <Table columns={this.columns} dataSource={this.state.dataSource} pagination={this.state.pagination}/>
    )
  }

  loadData(params) {
    params = params || {}
    params.limit = this.state.pagination.pageSize
    UserService.list(params).then(success.bind(this), fail)

    function success(res) {
      this.state.dataSource = res.body.data
      this.state.pagination.current = params.page
      this.state.pagination.total = res.body.total
      this.setState(this.state)
    }

    function fail(e) {
      message.error(e.response.text)
    }
  }

  handleChangeStatus(row) {
    const status = row.status === 1 ? 0 : 1

    UserService.updateStatus({
      id: row._id,
      status: status
    }).then(
      res => {
        row.status = status
        this.forceUpdate()
      },
      e => message.error(e.response.text)
    )
  }

  handleDelete(row) {
    UserService.del(row._id).then(
      res => {
        this.state.dataSource = this.state.dataSource.filter(row2 => {
          return row._id !== row2._id
        })
        this.forceUpdate()
      },
      e => message.error(e.response.text)
    )
  }

  handleResetPassword(row) {
    UserService.resetPassword(row._id).then(
      res => {},
      e => message.error(e.response.text)
    )
  }

  renderStatus(status, row) {
    if (status === 1) return <span style={{color: 'green'}}>
      <i className="anticon anticon-unlock"></i>
      <span> Normal</span>
    </span>
    return <span style={{color: 'red'}}>
      <i className="anticon anticon-lock"></i>
      <span> Locked</span>
    </span>
  }

  renderActionTitle() {
    return <Tooltip title="create new user">
      <button className="ant-btn ant-btn-circle ant-btn-primary" onClick={router.transitionTo.bind(this, 'create-user')}>
        <i className="anticon anticon-plus"></i>
      </button>
    </Tooltip>
  }

  renderActions(id, row) {
    if (row.username === 'admin') return

    return <span>
      <a href="javascript:;" onClick={this.handleChangeStatus.bind(this, row)}>Change Status</a>
      <span className="ant-divider"></span>
      <Popconfirm title="Reset this user's password to 123456???" onConfirm={this.handleResetPassword.bind(this, row)}>
        <a href="javascript:;" style={{color: 'orange'}}>Reset Password</a>
      </Popconfirm>
      <span className="ant-divider"></span>
      <Popconfirm title="Delete this user???" onConfirm={this.handleDelete.bind(this, row)}>
        <a href="javascript:;" style={{color: 'red'}}>Delete</a>
      </Popconfirm>
    </span>
  }
}
export default Admin(UserManagement)