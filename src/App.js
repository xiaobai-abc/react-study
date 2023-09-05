import style from './App.module.scss'
import { Component, Suspense ,lazy} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Menu from './component/Menu'

// import Home from './page/home/index'
// import Container from './page/container/count'
// import AllCount  from './page/allCount'
// import Count     from './page/merge/count'
// import Another   from './page/merge/another'
// import Index from './page/index'
// import TestCom from './page/test'
// import TestCom from '@/page/test'

import { Layout, Button, Divider } from 'antd'
import { Provider } from 'react-redux'

import allStore from './redux/allStore'

const Home = lazy(()=>import("@/page/home"))
const Container = lazy(()=>import("@/page/container/count"))
const AllCount = lazy(()=>import("@/page/allCount"))
const Count = lazy(()=>import("@/page/merge/count"))
const Another = lazy(()=>import("@/page/merge/another"))
const Index = lazy(()=>import("@/page/index"))
const Test = lazy(()=>import("@/page/qwe/Test"))
 

 
const { Header, Sider, Content } = Layout

export default class App extends Component {
  state = {
    collapsed: false
  }

  handToggle = () => {}

  render() {
    const { collapsed } = this.state
    return (
      <Layout className={style.app}>
        <Header
          style={{
            backgroundColor: 'transparent'
          }}>
          <Button onClick={this.handToggle}>xxx</Button>
        </Header>
        <Layout>
          <Sider width={'auto'} theme="light" collapsed={collapsed}>
            <Menu></Menu>
          </Sider>
          <Content className={style.contentStyle}>
            <Suspense fallback={<h1>loading......</h1>}>
              <Switch>
                <Route path="/" exact component={Index}></Route>
                <Route path="/home" component={Home}></Route>
                <Route path="/count">
                  {/* 容器组件 */}
                  <Container></Container>
                </Route>
                <Route path="/allCount" component={AllCount}></Route>
                <Route path="/merge">
                  <Provider store={allStore}>
                    <Count></Count>
                    <Divider />
                    <Another></Another>
                  </Provider>
                </Route>
                <Route path="/test" component={Test}></Route>
                <Redirect to="/"></Redirect>
              </Switch>
            </Suspense>
          </Content>
        </Layout>
        {/* <Footer>Footer</Footer> */}
      </Layout>
    )
  }
}
