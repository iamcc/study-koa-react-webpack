/*
* @Author: CC
* @Date:   2015-08-12 19:31:34
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 16:38:11
*/

import React from 'react'
import { Link } from 'react-router'
import { Menu, Dropdown } from 'antd'
import AuthAction from '../actions/AuthAction'
import Auth from '../components/Auth.jsx'

export default Auth(class Sidebar extends React.Component {
  render() {
    const onMenuClick = (key) => {
      switch(key) {
        case 'modify-password':
        case 'manage':
          router.transitionTo(key)
          break
        case 'logout':
          AuthAction.logout()
          break
      }
    }
    const menu = (
      <Menu onClick={onMenuClick}>
        <Menu.Item key="modify-password">
          <a href="javascript:;">Modify Password</a>
        </Menu.Item>
        <Menu.Item key="manage">
          <a href="javascript:;">Manage</a>
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="logout">
          <a href="javascript:;">Logout</a>
        </Menu.Item>
      </Menu>
    )
    return (
      <aside id="sidebar">
        <div id="account">
          <span id="username">{this.props.user.username}</span>
          <div className="spacer"></div>
          <Dropdown overlay={menu}>
            <i className="anticon anticon-down"></i>
          </Dropdown>
        </div>
        <ul id="menu">
          <li>
            <Link to="/order">Order</Link>
          </li>
          <li>
            <Link to="/stock">Stock</Link>
          </li>
          <li>
            <Link to="/supplier">Supplier</Link>
          </li>
        </ul>
      </aside>
    )
  }
})