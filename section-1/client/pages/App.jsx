/*
* @Author: CC
* @Date:   2015-08-11 18:11:22
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 10:42:31
*/

import React from 'react'
import Actions from '../actions'
import AuthStore from '../stores/AuthStore'

export default class App extends React.Component {
  static willTransitionTo(transition, params, query, callback) {
    AuthStore.getState().loggedIn || transition.redirect('login')
    callback()
  }

  constructor(props) {
    super(props)
    this.state = {
      auth: AuthStore.getState()
    }
  }

  onAuthChanged(auth) {
    console.log('auth changed', auth)
  }

  componentWillMount() {
    this.unsubscribe = AuthStore.listen(this.onAuthChanged.bind(this))
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <h1>App</h1>
    );
  }
}