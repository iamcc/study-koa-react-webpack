/*
* @Author: CC
* @Date:   2015-08-11 18:17:56
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 14:05:38
*/

import Reflux from 'reflux'
import Actions from '../actions'
import AuthService from '../services/AuthService'

const TOKEN_KEY = 'token'

export default Reflux.createStore({
  listenables: Actions,

  init() {
    this.state = {
      loggedIn: false,
      token: '',
      user: false,
      loadng: false,
      error: false,
    }
    this.state.token = getToken()
    try {
      this.state.user = this.state.token && atob(this.state.token.split('.')[1])
      this.state.loggedIn = !!this.state.user
    } catch(e) {
      this.reset()
      console.error(e)
    }
  },

  onLogin(user) {
    if (this.state.loading) return

    this.reset()
    this.state.loading = true
    this.changed()

    AuthService.login(user).then(Actions.loginSuccess, Actions.loginFail)
  },

  onLoginSuccess(res) {
    this.reset()
    this.state.token = res.body.token
    this.state.user = res.body.user
    this.state.loggedIn = true
    this.changed()
    setToken(this.state.token)
  },

  onLoginFail(e) {
    this.reset()
    this.state.error = e.response.body
    this.changed()
  },

  onLogout() {
    this.reset()
    this.changed()
  },

  getState() {
    return this.state
  },

  changed() {
    this.trigger(this.state)
  },

  reset() {
    this.state = {
      loggedIn: false,
      token: '',
      user: false,
      loadng: false,
      error: false,
    }
    setToken(this.state.token)
  }
})

function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token)
}