/*
* @Author: CC
* @Date:   2015-08-13 18:04:53
* @Last Modified by:   CC
* @Last Modified time: 2015-08-13 18:31:48
*/

import React from 'react/addons'
import { Tabs } from 'antd'
import Admin from '../../components/Admin.jsx'
import UserManagement from './UserManagement.jsx'
import StockManagement from './StockManagement.jsx'

class Manage extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="user" onChange={this.onTabChange.bind(this)}>
        <Tabs.TabPane tab="User Management" key="user">
          <UserManagement/>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Stock Management" key="stock">
          <StockManagement/>
        </Tabs.TabPane>
      </Tabs>
    )
  }

  onTabChange(key) {
    console.log(key)
  }
}
export default Admin(Manage)