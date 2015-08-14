/*
* @Author: CC
* @Date:   2015-08-11 18:05:12
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 18:44:17
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
      errors: {}
    }
  }

  authChange(auth) {
    if (auth.loggedIn) return router.transitionTo('app')

    for(let k in auth.error) {
      this.state.errors[k] = auth.error[k]
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

    const state = this.state
    const errors = state.errors = {}

    !state.username && (errors.username = 'User Name is empty')
    !state.password && (errors.password = 'Password is empty')
    state.password.length < 6 && (errors.password = 'at least 6 characters')

    !!errors.password && this.form.password.focus()
    !!errors.username && this.form.username.focus()

    if (errors.username || errors.password) return this.setState(state)

    this.setState({ loading: true })

    AuthService.login(state.username, state.password, (e, res) => {
      this.setState({ loading: false })

      if (res.ok) return AuthAction.login(res.body)

      if (e.status === 400) {
        for (let k in res.body) {
          this.setState({ errors: { [k]: res.body[k] } })
          this.form[k].focus()
        }
        return
      }

      message.error(res.text)
    })
  }

  render() {
    const errors = this.state.errors

    return (
      <form className="ant-form-horizontal" style={this.state.style.form} onSubmit={this.handleSubmit.bind(this)}>
        <div className={'ant-form-item' + (errors.username ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>Username: </label>
          <div className="col-18">
            <input type="text" className="ant-input" ref="username" valueLink={this.linkState('username')}/>
            <p className="ant-form-explain">{errors.username}</p>
          </div>
        </div>
        <div className={'ant-form-item' + (errors.password ? ' has-error' : '')}>
          <label htmlFor="" className="col-6" required>Password: </label>
          <div className="col-18">
            <input type="password" className="ant-input" ref="password" valueLink={this.linkState('password')}/>
            <p className="ant-form-explain">{errors.password}</p>
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