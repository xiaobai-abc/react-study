import React, { Component } from 'react'
import { Divider, Select, Button, Space, Tag } from 'antd'
// 这里是UI组件

export default class index extends Component {
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
    const {  selectNum } = this.state
    this.props.handOperate(type,selectNum)

  }

  componentDidMount() {
    //组件挂在完成后执行
    // console.log(this.props,"store 传递的参数")
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
        <h1 style={{
          fontSize : "26px"
        }}>这里是UI组件</h1>
        <h1>外层嵌套了容器组件 (connect) Redux 测试案例!!!!~~~~</h1>
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
            {/* <Button type="primary" onClick={() => this.handOperate('+')}> */}
            {/* 给函数传参 需要函数体 
              1. 函数体 trturn一个函数执行传参
              2. 通过bind指定this与函数参数 不执行  返回修改后的函数
            */}
            <Button type="primary" onClick={this.handOperate.bind(this, '+')}>
              + (加)
            </Button>
            <Button type="primary" onClick={() => this.handOperate('-')}>
              - (减)
            </Button>
            <Button onClick={this.props.asyncJia.bind(this,500,this.state.selectNum)}>异步计算</Button>
          </Space>
        </div>
      </div>
    )
  }
}
