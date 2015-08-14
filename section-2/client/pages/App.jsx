/*
* @Author: CC
* @Date:   2015-08-11 18:11:22
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 12:24:05
*/

import React from 'react'
import { RouteHandler } from 'react-router'
import AuthStore from '../stores/AuthStore'
import Sidebar from '../components/Sidebar.jsx'

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
    if (!auth.loggedIn) router.transitionTo('login')
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
      <div>
        <Sidebar user={this.state.auth.user}/>
        <main id="content">
          <RouteHandler/>
        </main>
      </div>
    )
  }
}