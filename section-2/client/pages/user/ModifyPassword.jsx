/*
* @Author: CC
* @Date:   2015-08-13 10:42:16
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 18:43:26
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
      errors: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (this.state.loading) return

    const state = this.state
    const errors = this.state.errors = {}

    state.oldPwd.length < 6 && (errors.oldPwd = 'at least 6 characters')
    state.newPwd.length < 6 && (errors.newPwd = 'at least 6 characters')
    state.oldPwd === state.newPwd && (errors.newPwd = 'must be a new password')

    errors.newPwd && this.refs.newPwd.getDOMNode().focus()
    errors.oldPwd && this.refs.oldPwd.getDOMNode().focus()

    if (errors.oldPwd || errors.newPwd) return this.setState(state)

    state.loading = true
    this.setState(state)

    UserService.modifyPassword(state.oldPwd, state.newPwd, (e, res) => {
      if (e) {
        if (e.status === 400) {
          for (let k in res.body) {
            errors[k] = res.body[k]
            this.refs[k].getDOMNode().focus()
          }
        } else {
          message.error(res.text)
        }
      } else {
        state.oldPwd = ''
        state.newPwd = ''
        message.success('success')
      }

      state.loading = false
      this.setState(state)
    })
  }

  render() {
    const handleSubmit = this.handleSubmit.bind(this)
    const errors = this.state.errors

    return (
      <form className="ant-form-horizontal" style={style.form} onSubmit={handleSubmit}>
        <div className={"ant-form-item" + (errors.oldPwd ? ' has-error': '')}>
          <label className="col-6" required>Old Password</label>
          <div className="col-18">
            <input type="password" className="ant-input" valueLink={this.linkState('oldPwd')} ref="oldPwd"/>
            <p className="ant-form-explain">{errors.oldPwd}</p>
          </div>
        </div>
        <div className={"ant-form-item" + (errors.newPwd ? ' has-error': '')}>
          <label className="col-6" required>New Password</label>
          <div className="col-18">
            <input type="password" className="ant-input" valueLink={this.linkState('newPwd')} ref="newPwd"/>
            <p className="ant-form-explain">{errors.newPwd}</p>
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