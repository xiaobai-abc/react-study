import React, { Component } from 'react'
import { Divider, Select, Button, Space, Tag } from 'antd'
import { connect } from 'react-redux'
// 整合版  优化 redux 优化后
/**
 *  index.js  subscribe 监听store变化 页面触发更新
 *  redux 引入 Provider 传入store 解决多组件使用store问题
 *
 *  容器组件 UI组件的整合
 *
 *  connect 函数柯里化 添加到 props里
 *  第一个参数 store 数据 函数 参数: store => {} store 数据对象
 *  传入两个参数  第二个 函数 / 对象
 *  {
 *    函数 : return action对象
 *    异步函数 : return  函数 参数: dispatch => dispatch 操作action 动作对象
 *  }
 */

class CountUi extends Component {
  state = {
    num: 0,
    selectNum: 0, //选中的数据
    options: []
  }

  handleChange = value => {
    //选择数据触发
    this.setState({
      selectNum: value
    })
  }

  handOperate = async type => {
    //操作数字计算  分离 异步方法
    const { selectNum } = this.state
    this.props.handOperate(type, selectNum)
  }

  componentDidMount() {
    //组件挂在完成后执行
    // console.log(this.props, 'store 传递的参数')
    const arr = []
    for (let i = 1; i <= 10; i++) {
      arr.push({
        value: i,
        label: i
      })
    }
    this.setState({
      options: arr,
      selectNum: arr[0].value
    })
  }
  render() {
    const { options } = this.state
    return (
      <div>
        <h1
          style={{
            fontSize: '26px'
          }}>
          这里是完整版
        </h1>
        <h1>Redux 测试案例!!!!~~~~</h1>
        <Divider />
        <Tag
          style={{
            fontSize: '20px',
            height: 'auto',
            width: '100px',
            textAlign: 'center',
            padding: '5px 0'
          }}>
          {this.props.count}
        </Tag>
        <Divider />

        <Divider />
        <div className="useList">
          <Space size={10}>
            <Select
              style={{
                width: '100px'
              }}
              value={this.state.selectNum}
              onChange={this.handleChange}
              options={options}
            />
            <Button type="primary" onClick={this.handOperate.bind(this, '+')}>
              + (加)
            </Button>
            <Button type="primary" onClick={this.handOperate.bind(this, '-')}>
              - (减)
            </Button>
            <Button
              onClick={this.props.asyncJia.bind(
                this,
                500,
                this.state.selectNum
              )}>
              异步计算
            </Button>
          </Space>
        </div>
      </div>
    )
  }
}
export default connect(
  store => ({
    count: store
  }),

  {
    handOperate: (type, value) => ({ type, selectNum: value }),
    asyncJia: (time, value) => {
      //这里是动作对象 action
      return dispatch => {
        setTimeout(() => {
          dispatch({
            type: 'async',
            selectNum: value
          })
        }, time)
      }
    }
  }
)(CountUi)
