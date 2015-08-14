/*
* @Author: CC
* @Date:   2015-08-13 10:42:48
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 18:55:47
*/

import React from 'react'
import AuthStore from '../stores/AuthStore'

export default Component => {
  return class Admin extends React.Component {
    static willTransitionTo(transition) {
      if (!AuthStore.getState().loggedIn || AuthStore.getState().user.role !== 'admin')
        transition.redirect('login', {}, {nextPath: transition.path})
    }

    constructor() {
      super()
      this.state = {
        auth: AuthStore.getState()
      }
    }

    authChanged(auth) {
      if (!auth.loggedIn || auth.user.role !== 'admin')
        router.transitionTo('login')
    }

    componentWillMount() {
      this.unsubscribe = AuthStore.listen(this.authChanged.bind(this))
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return <Component {...this.props} user={this.state.auth.user} token={this.state.auth.token}/>
    }
  }
}