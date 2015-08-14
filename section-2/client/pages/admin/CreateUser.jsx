/*
* @Author: CC
* @Date:   2015-08-14 13:16:41
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 16:29:32
*/

import React from 'react/addons'
import { message, Select } from 'antd'
import Admin from '../../components/Admin.jsx'
import UserService from '../../services/UserService'

class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      username: '',
      password: '',
      role: 'sales',
      errors: {}
    }
  }

  componentDidMount() {
    this.refs.username.getDOMNode().focus()
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this)
    const changeRole = this.changeRole.bind(this)
    const errors = this.state.errors

    return <form className="ant-form-horizontal" style={{width: '500px'}} onSubmit={handleSubmit}>
      <div className={"ant-form-item" + (errors.username ? ' has-error' : '')}>
        <label className="col-6" required>User Name</label>
        <div className="col-18">
          <input type="text" className="ant-input" valueLink={this.linkState('username')} ref="username"/>
          <p className="ant-form-explain">{errors.username}</p>
        </div>
      </div>

      <div className={"ant-form-item" + (errors.password ? ' has-error' : '')}>
        <label className="col-6" required>Password</label>
        <div className="col-18">
          <input type="password" className="ant-input" valueLink={this.linkState('password')} ref="password"/>
          <p className="ant-form-explain">{errors.password}</p>
        </div>
      </div>

      <div className="ant-form-item">
        <label className="col-6" required>Role</label>
        <Select className="col-18" value={this.state.role} onChange={changeRole}>
          <Select.Option value="sales">Sales</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
        </Select>
      </div>

      <div className="col-18 col-offset-6">
        <button className="ant-btn ant-btn-primary" disabled={this.state.loading ? true : false}>
          <span>Create </span>
          {this.state.loading
            ? <i className="anticon anticon-loading"></i>
            : ''}
        </button>
      </div>
    </form>
  }

  changeRole(val) {
    this.setState({role: val})
  }

  handleSubmit(e) {
    e.preventDefault()

    const state = this.state

    if (state.loading) return

    const errors = this.state.errors = {}

    !state.username && (errors.username = 'username is empty')
    state.password.length < 6 && (errors.password = 'password must be 6 characters at least')
    !state.password && (errors.password = 'password is empty')

    errors.password && this.refs.password.getDOMNode().focus()
    errors.username && this.refs.username.getDOMNode().focus()

    if (Object.keys(errors).length) return this.forceUpdate()

    state.loading = true
    this.forceUpdate()

    UserService.create({
      username: state.username,
      password: state.password,
      role: state.role
    }, (e, res) => {
      this.setState({loading: false})

      if (e) {
        if (e.status === 400) {
          for (let k in res.body) {
            state.errors[k] = res.body[k]
            this.refs[k].getDOMNode().focus()
          }
          this.forceUpdate()
          return
        }
        return message.error(res.text)
      }

      message.success('success')

      this.setState({
        username: '',
        password: '',
        role: 'sales'
      })
    })
  }
}
require('react-mixin')(CreateUser.prototype, React.addons.LinkedStateMixin)
export default Admin(CreateUser)