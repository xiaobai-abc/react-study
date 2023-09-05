import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";

// 这里 reducer 负责操作 展示的数据
// 应该分离 不同的库

// 使用中间件 redux-thunk 进行异步代码

// 修改 第一个 参数 为 redux 整合管理所有数据的总对象
// redux reducer 对象里的属性值 必须是 function 且有返回值
// 用于汇总到一起

// 这里 声明了两个store数据 但是使用的一个组件 数据触发 或者方法 都会触发全部store  数据
const allReducer = combineReducers({
  count: (previouState = 0, { selectNum, type }) => {
    console.log("count 触发",type)
    
    switch (type) {
      case "+":
        return previouState + selectNum;
      case "-":
        return previouState - selectNum;
      case "async":
        return previouState + selectNum;
    }
    return previouState;
  },
  personArr: (
    previouState = [
      {
        id: 0,
        name: "小明",
      },
      {
        id: 1,
        name: "小芳",
      },
      {
        id: 2,
        name: "小红",
      },
    ],
    { type, value }
  ) => {
    console.log("presonArr 的数据触发",type)
    // console.log(previouState, actiong, 'previou')
    switch (type) {
      case "push":
        const tempArr = [...previouState];
        tempArr.push({
          id: previouState.length,
          name : value,
        });
        return tempArr;
    }

    return previouState;
  },
});

export default createStore(allReducer, applyMiddleware(thunk));
