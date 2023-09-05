import { AppstoreOutlined, MailOutlined } from '@ant-design/icons'
import { Menu } from 'antd'

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

class Index extends Component {
  state = {
    items: [
      getItem('菜单1', 'key1', <MailOutlined />, [
        getItem('home', '/home', null, null),
        getItem('count', '/count', null, null),
        getItem('allCount', '/allCount', null, null),
        getItem('merge', '/merge', null, null),
        getItem('默认空', '/', null, null),
        getItem('测试', '/test', null, null),
      ]),
      getItem('菜单2', 'key2', <AppstoreOutlined />, [
        getItem('Option 5', '5', null, null),
        getItem('Option 6', '6', null, null)
        // getItem('Submenu', 'sub3', null, [
        //   getItem('Option 7', '7'),
        //   getItem('Option 8', '8')
        // ])
      ])
    ],
    openKeys: [], //展开的数组
    selectedKeys: [] //选中的数据
  }
  clickMenuItem = item => {
    console.log(item)
    // this.props.navigate.to(item.key)
    this.setState({
      selectedKeys: [item.key]
    })
    this.props.history.push(item.key)
  }
  componentDidMount() {
 
    this.setState({
      openKeys: [this.state.items[0].key],
      selectedKeys: [this.props.location.pathname]
    })
  }

  render() {
    const { items, openKeys, selectedKeys } = this.state
    return (
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        mode="inline"
        theme="light"
        items={items}
        onClick={this.clickMenuItem}
        onOpenChange={item => {
          this.setState({
            openKeys: item
          })
        }}
      />
    )
  }
}

export default withRouter(Index)
// function WithNavigate(props) {
//   let navigate = useNavigate();
//   return <Index {...props} navigate={navigate} />
// }

// export default function withParamsAndNavigate(Component) {
//   return (props) => (
//    <Index {...props} params={useParams()} navigate={useNavigate()} />
// );
// }
