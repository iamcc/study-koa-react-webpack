/*
* @Author: CC
* @Date:   2015-08-11 18:17:56
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 16:27:38
*/

import Reflux from 'reflux'
import AuthAction from '../actions/AuthAction'

const TOKEN_KEY = 'token'

export default Reflux.createStore({
  listenables: AuthAction,

  init() {
    this.state = {
      loggedIn: false,
      token: '',
      user: false,
    }
    this.state.token = getToken()
    try {
      this.state.user = this.state.token && JSON.parse(atob(this.state.token.split('.')[1]))
      this.state.loggedIn = !!this.state.user
    } catch(e) {
      this.reset()
      console.error(e)
    }
  },

  onLogin(data) {
    this.reset()
    this.state.token = data.token
    this.state.user = data.user
    this.state.loggedIn = true
    this.changed()
    setToken(data.token)
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