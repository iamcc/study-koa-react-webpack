/*
* @Author: CC
* @Date:   2015-08-13 09:48:42
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 09:59:02
*/

import React from 'react'
import AuthStore from '../stores/AuthStore'

export default Component => {
  return class Auth extends React.Component {
    static willTransitionTo(transition) {
      !AuthStore.getState().loggedIn && transition.redirect('login', {}, {nextPath: transition.path})
    }

    constructor() {
      super()
      this.state = {
        auth: AuthStore.getState()
      }
    }

    authChanged(auth) {
      !auth.loggedIn && router.transitionTo('login')
    }

    componentWillMount() {
      this.unsubscribe = AuthStore.listen(this.authChanged.bind(this))
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return <Component {...this.props} user={this.state.auth.user}/>
    }
  }
}