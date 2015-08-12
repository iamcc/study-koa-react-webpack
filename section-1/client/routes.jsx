/*
* @Author: CC
* @Date:   2015-08-11 18:00:38
* @Last Modified by:   CC
* @Last Modified time: 2015-08-12 10:20:04
*/

import React from 'react'
import Router, { Link, Route, RouteHandler, DefaultRoute } from 'react-router'
import App from './pages/App.jsx'
import Login from './pages/Login.jsx'

const routes = (
  <Route>
    <Route name="app" path="/" handler={App}>
    </Route>
    <Route name="login" handler={Login}>
    </Route>
  </Route>
)

global.router = Router.create({ routes })

router.run(Root => {
  React.render(<Root/>, document.body)
})