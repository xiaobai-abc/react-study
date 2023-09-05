// 容器组件
import CountUi from '../../countUi'

import { connect } from 'react-redux'
// 连接 store
// 传给ui组件 第一个参数 返回对象的prop 属性 key value
//  第二个参数 返回对象的prop 属性key value 函数 操作
//  这里存储的是action 动作对象

// mapStateToProps 映射状态
// mapDipatchToProps 映射操作状态的方法

export default connect(
  store => ({
    count: store
  }),
  // dispatch => ({
  //   // 操作
  //   handOperate: (type, value) => {
  //     dispatch({
  //       type,
  //       selectNum: value
  //     })
  //   },
  //   asyncJia: (time = 500, value) => {
  //     // 异步计算
  //     setTimeout(() => {
  //       dispatch({
  //         type: 'async',
  //         selectNum: value
  //       })
  //     }, time)
  //   }
  // }),
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
