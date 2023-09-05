import React, { Component } from 'react'
import { Divider, Space, Tag, Input, Button } from 'antd'
import { connect } from 'react-redux'
// 整合第二部分

class Another extends Component {
  state = {
    inputValue: ''
  }

  componentDidMount() {
    // console.log("componentDidMount ==> props",this.props)
  }

  inputChange = value => {
    // 输入框修改触发  设置inputvalue 值
    this.setState({
      inputValue: value
    })
  }
  handClick = () => {
    const { inputValue } = this.state
    this.props.handlerArr('push',inputValue)
    this.setState({
      inputValue : ''
    })
  }

  render() {
    return (
      <div>
        <h1
          style={{
            fontSize: '26px'
          }}>
          第二部分
        </h1>
        <h1>Another</h1>
        <Divider />
        <Tag
          style={{
            fontSize: '20px',
            textAlign: 'center',
            padding: '10px 5px'
          }}>
          <ul
            style={{
              margin: '0'
            }}>
            {this.props.personArr.map(item => {
              return (
                <li key={item.id}>
                  {item.id} ---- {item.name}
                </li>
              )
            })}
          </ul>
        </Tag>
        <Tag>{this.state.inputValue || <>&nbsp;</>}</Tag>
        <Divider />
        <Space size={10}>
          <div
            style={{
              display: 'flex'
            }}>
            <Input
              placeholder="请输入名称"
              value={this.state.inputValue}
              onChange={e => this.inputChange(e.target.value)}
            />
            <Button onClick={this.handClick}>添加</Button>
          </div>
        </Space>
      </div>
    )
  }
}

export default connect(
  store => ({
    personArr: store.personArr
  }),
  {
    // 修改操作数组
    handlerArr: (type, value) => ({ type, value })
  }
)(Another)
