/*
* @Author: CC
* @Date:   2015-08-11 18:05:12
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 14:11:52
*/

import React from 'react'
import { message } from 'antd'
import Actions from '../actions'
import AuthStore from '../stores/AuthStore'
import cx from 'classnames'

export default class Login extends React.Component {
  static willTransitionTo(transition) {
    AuthStore.getState().loggedIn && transition.redirect('app')
  }

  constructor(props) {
    super(props)
    this.state = {
      auth: AuthStore.getState(),
      style: {
        form: {
          width: '300px',
          height: '200px',
          margin: '200px auto'
        },
      },
      status: {
        username: {},
        password: {},
        submit: {},
      }
    }
  }

  authChange(auth) {
    if (auth.loggedIn) return router.transitionTo('app')

    for(let k in auth.error) {
      this.state.status[k].error = auth.error[k]
      this.form[k].focus()
    }

    this.state.auth = auth
    this.setState(this.state)
  }

  componentDidMount() {
    this.unsubscribe = AuthStore.listen(this.authChange.bind(this))
    this.form = {
      username: this.refs.username.getDOMNode(),
      password: this.refs.password.getDOMNode(),
    }
    this.form.username.focus()
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = this.form.username.value.trim()
    const password = this.form.password.value.trim()
    const status = this.state.status

    status.username.error = false
    status.password.error = false

    if (!username) status.username.error = '用户名不能空'

    if (!password) status.password.error = '密码不能空'
    else if (password.length < 6) status.password.error = '密码不能少于6位数'

    this.setState(this.state)

    !!status.username.error && this.form.username.focus()
    !!status.password.error && this.form.password.focus()

    const hasError = status.username.error || status.password.error

    if (hasError) return

    Actions.login({
      username: username,
      password: password,
    })
  }

  render() {
    const status = {
      username: cx('ant-form-item', {'has-error': this.state.status.username.error}),
      password: cx('ant-form-item', {'has-error': this.state.status.password.error}),
      submit: cx('ant-btn ant-btn-primary', {disabled: this.state.auth.loading})
    }

    return (
      <form className="ant-form-horizontal" style={this.state.style.form} onSubmit={this.handleSubmit.bind(this)}>
        <div className={status.username}>
          <label htmlFor="" className="col-6" required>Username: </label>
          <div className="col-18">
            <input type="text" className="ant-input" ref="username"/>
            <p className="ant-form-explain">{this.state.status.username.error}</p>
          </div>
        </div>
        <div className={status.password}>
          <label htmlFor="" className="col-6" required>Password: </label>
          <div className="col-18">
            <input type="password" className="ant-input" ref="password"/>
            <p className="ant-form-explain">{this.state.status.password.error}</p>
          </div>
        </div>
        <div className="ant-form-item">
          <div className="col-18 col-offset-6">
            <button type="submit" className={status.submit}>
              <span>Login </span>
              {this.state.auth.loading
                ? <i className="anticon anticon-loading"></i>
                : ''}
            </button>
          </div>
        </div>
      </form>
    );
  }
}