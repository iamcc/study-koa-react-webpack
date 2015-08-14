/*
* @Author: CC
* @Date:   2015-08-13 10:42:16
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 12:26:42
*/

import React from 'react/addons'
import { message } from 'antd'
import Auth from '../../components/Auth.jsx'
import UserService from '../../services/UserService'

const style = {
  form: {
    width: '600px'
  }
}

class ModifyPassword extends React.Component {
  constructor() {
    super()
    this.state = {
      oldPwd: '',
      newPwd: '',
      loading: false,
      error: {
        oldPwd: '',
        newPwd: '',
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.loading) return

    this.state.error.oldPwd = {}
    this.state.error.newPwd = {}

    this.state.oldPwd.length < 6 && (this.state.error.oldPwd.error = '密码至少6位数')
    this.state.newPwd.length < 6 && (this.state.error.newPwd.error = '密码至少6位数')
    this.state.oldPwd === this.state.newPwd && (this.state.error.newPwd.error = '新密码不能和旧密码相同')

    this.state.error.newPwd.error && this.refs.newPwd.getDOMNode().focus()
    this.state.error.oldPwd.error && this.refs.oldPwd.getDOMNode().focus()

    if (this.state.error.oldPwd.error
      || this.state.error.newPwd.error) return this.setState(this.state)

    this.state.loading = true
    this.setState(this.state)

    UserService.modifyPassword(this.state.oldPwd, this.state.newPwd, (e, res) => {
      if (e) {
        if (e.status === 400) {
          for (let k in res.body) {
            this.state.error[k].error = res.body[k]
            this.refs[k].getDOMNode().focus()
          }
        } else {
          message.error(res.text)
        }
      } else {
        this.state.oldPwd = ''
        this.state.newPwd = ''
        message.success('success')
      }

      this.state.loading = false
      this.setState(this.state)
    })
  }

  render() {
    return (
      <form className="ant-form-horizontal" style={style.form} onSubmit={this.handleSubmit.bind(this)}>
        <div className={"ant-form-item" + (this.state.error.oldPwd.error ? ' has-error': '')}>
          <label className="col-6" required>Old Password</label>
          <div className="col-18">
            <input type="password" className="ant-input" valueLink={this.linkState('oldPwd')} ref="oldPwd"/>
            <p className="ant-form-explain">{this.state.error.oldPwd.error}</p>
          </div>
        </div>
        <div className={"ant-form-item" + (this.state.error.newPwd.error ? ' has-error': '')}>
          <label className="col-6" required>New Password</label>
          <div className="col-18">
            <input type="password" className="ant-input" valueLink={this.linkState('newPwd')} ref="newPwd"/>
            <p className="ant-form-explain">{this.state.error.newPwd.error}</p>
          </div>
        </div>
        <div className="ant-form-item">
          <div className="col-18 col-offset-6">
            <button
              type="submit"
              className={"ant-btn ant-btn-primary" + (this.state.loading ? ' disabled' : '')}>
              <span>Save </span>
              {this.state.loading
                ? <i className="anticon anticon-loading"></i>
                : ''}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

require('react-mixin')(ModifyPassword.prototype, React.addons.LinkedStateMixin)
export default Auth(ModifyPassword)