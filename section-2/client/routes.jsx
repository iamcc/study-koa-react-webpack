/*
* @Author: CC
* @Date:   2015-08-11 18:00:38
* @Last Modified by:   CC
* @Last Modified time: 2015-08-14 13:27:30
*/

import React from 'react'
import Router, { Link, Route, RouteHandler, DefaultRoute, Redirect } from 'react-router'
import App from './pages/App.jsx'
import Login from './pages/Login.jsx'
import OrderIndex from './pages/order/Index.jsx'
import StockIndex from './pages/stock/Index.jsx'
import SupplierIndex from './pages/supplier/Index.jsx'
import UserModifyPassword from './pages/user/ModifyPassword.jsx'
import AdminManage from './pages/admin/Manage.jsx'
import AdminCreateUser from './pages/admin/CreateUser.jsx'

const routes = (
  <Route>
    <Route name="app" path="/" handler={App}>
      <Route name="order" handler={OrderIndex}></Route>
      <Route name="stock" handler={StockIndex}></Route>
      <Route name="supplier" handler={SupplierIndex}></Route>
      <Route name="user">
        <Route name="modify-password" handler={UserModifyPassword}></Route>
      </Route>
      <Route name="admin">
        <Route name="manage">
          <Route name="create-user" handler={AdminCreateUser}></Route>
          <DefaultRoute handler={AdminManage}/>
        </Route>
      </Route>
    </Route>
    <Route name="login" handler={Login}>
    </Route>
    <Redirect to="app"></Redirect>
  </Route>
)

global.router = Router.create({ routes })

router.run(Root => {
  React.render(<Root/>, document.body)
})