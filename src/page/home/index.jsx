import React, { Component } from 'react'
import store from '../../redux/store'
import { Divider, Select, Button, Space, Tag } from 'antd'
import style from './index.module.scss'
 

export default class index extends Component {
  state = {
    num: 0,
    selectNum: 0, //选中的数据
    options: []
  }

  handUseClick = ()=>{
    
    // const input = document.createElement("input");
    //     input.type = "file";
    //     input.click();
    //     input.onchange = (e) => {
    //       let file = input.files[0];
    //       let formData = new FormData();
    //       formData.append("file", file);
    //       formData.append("version_number", "1.0.7");
    //       formData.append("type", "tv");
    //       axios
    //         .post(
    //           "https://iot.meseeagro.com/api/v1/data/upgrade_version",
    //           formData,
    //           // {
    //           //   type: "tv",
    //           //   version_number: "1.0.5",
    //           //   file: formData,
    //           // },
    //           { 
    //             headers: {
    //               Authorization: "Bearer QXBwL0RhdGFEYXRhQ29udHJvbGxlcm1lc2VlcXVpY2t1cGdyYWRlX3ZlcnNpb24=",
    //               'Content-Type': 'multipart/form-data'
    //             },
                
    //           }
    //         )
    //         .then((resp) => {
    //           console.log(resp);
    //         });
    //     };
  }
  handleChange = value => {
    //选择数据触发
    this.setState({
      selectNum: value
    })
  }
  handAsync = () => {
    //异步计算
    // action 动作对象 里面分离动作函数
    // function createJia(value) {
    //   return {
    //     type : "+",
    //     selectNum : value
    //   }
    // }
    // store.dispatch(createJia(selectNum))
    // reducers  object ====> 同步action
    // 返回值是函数    function return function  ====> 异步action
    const { num, selectNum } = this.state
    setTimeout(() => {
      this.setState({
        num: num + selectNum
      })
    }, 3000)

    function createJia(value) {
      // 使用中间件 applyMiddleware(thunk) redux-thunk 才能让函数生效
      // return 的值必须是函数 才是异步 
      return dispatch => {
        setTimeout(() => {
          dispatch({
            type: 'async',
            selectNum: value
          })
        }, 3000)
      }
    }
    store.dispatch(createJia(selectNum))
  }
  handOperate = async type => {
    //操作数字计算  分离 异步方法
    const { num, selectNum } = this.state
    let finishNum = 0
    switch (type) {
      case '+':
        finishNum = num + selectNum
        break
      case '-':
        finishNum = num - selectNum
        break
      // case 'async':
      //   // this.asyncCalc()   // change state async
      //   finishNum = num + selectNum
      //   await this.asyncCalc(3000)
      //   break
    }
    store.dispatch({
      type,
      selectNum
    })
    this.setState({
      num: finishNum
    })
  }
  async asyncCalc(time = 2000) {
    //异步计算
    return new Promise(r => setTimeout(r, time))
  }

  componentDidMount() {
    //组件挂在完成后执行
    store.subscribe(() => {
      //更新后需要设置state 触发render
      console.log(store.getState(), 'redux state 更新')
      this.setState({})
    })

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
      <div className={style.homeIndex}>
        <button onClick={this.handUseClick}>点击测试</button>
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
          {this.state.num}
        </Tag>
        <Divider />
        <h1>redux state</h1>
        <Tag
          style={{
            fontSize: '20px',
            height: 'auto',
            width: '100px',
            textAlign: 'center',
            padding: '5px 0'
          }}>
          {store.getState()}
        </Tag>

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
            <Button onClick={this.handAsync}>异步计算</Button>
          </Space>
        </div>
      </div>
    )
  }
}
