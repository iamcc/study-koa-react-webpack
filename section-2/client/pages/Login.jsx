/*
* @Author: CC
* @Date:   2015-08-11 18:05:12
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 16:25:22
*/

import React from 'react/addons'
import { message } from 'antd'
import AuthAction from '../actions/AuthAction'
import AuthStore from '../stores/AuthStore'
import AuthService from '../services/AuthService'

export default class Login extends React.Component {
  static willTransitionTo(transition) {
    AuthStore.getState().loggedIn && transition.redirect('app')
  }

  constructor() {
    super()
    this.state = {
      auth: AuthStore.getState(),
      style: {
        form: {
          width: '300px',
          height: '200px',
          margin: '200px auto'
        },
      },
      loading: false,
      username: '',
      password: '',
      error: {
        username: '',
        password: '',
      }
    }
  }

  authChange(auth) {
    if (auth.loggedIn) return router.transitionTo('app')

    for(let k in auth.error) {
      this.state.error[k] = auth.error[k]
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

    if (this.state.loading) return

    this.state.error.username = false
    this.state.error.password = false

    !this.state.username && (this.state.error.username = '用户名不能空')
    !this.state.password && (this.state.error.password = '密码不能空')
    this.state.password.length < 6 && (this.state.error.password = '密码不能少于6位数')

    !!this.state.error.password && this.form.password.focus()
    !!this.state.error.username && this.form.username.focus()

    if (this.state.error.username
      || this.state.error.password) return this.setState(this.state)

    this.setState({ loading: true })

    AuthService.login(this.state.username, this.state.password, (e, res) => {
      this.setState({ loading: false })

      if (res.ok) return AuthAction.login(res.body)

      if (e.status === 400) {
        for (let k in res.body) {
          this.setState({ error: { [k]: res.body[k] } })
          this.form[k].focus()
        }
        return
      }

      message.error(res.text)
    })
  }

  render() {
    return (
      <form className="ant-form-horizontal" style={this.state.style.form} onSubmit={this.handleSubmit.bind(this)}>
        <div className={'ant-form-item' + (this.state.error.username ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>Username: </label>
          <div className="col-18">
            <input type="text" className="ant-input" ref="username" valueLink={this.linkState('username')}/>
            <p className="ant-form-explain">{this.state.error.username}</p>
          </div>
        </div>
        <div className={'ant-form-item' + (this.state.error.password ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>Password: </label>
          <div className="col-18">
            <input type="password" className="ant-input" ref="password" valueLink={this.linkState('password')}/>
            <p className="ant-form-explain">{this.state.error.password}</p>
          </div>
        </div>
        <div className="ant-form-item">
          <div className="col-18 col-offset-6">
            <button type="submit" className={'ant-btn ant-btn-primary' + (this.state.loading ? ' disabled' : '')}>
              <span>Login </span>
              {this.state.loading
                ? <i className="anticon anticon-loading"></i>
                : ''}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

require('react-mixin')(Login.prototype, React.addons.LinkedStateMixin)