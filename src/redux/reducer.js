// previouState 第一次 初始化值
export default (previouState = 0, actiong) => {
  // console.log(previouState, actiong)
  const { selectNum, type } = actiong
  switch (type) {
    case '+':
      return previouState + selectNum
    case '-':
      return previouState - selectNum
    case 'async':
      // const finishNum= await new Promise(r => {
      //   setTimeout(() => {
      //     console.log('state 4s finish')
      //     r(previouState + selectNum)
      //   }, 4000)
      // })
      // console.log(finishNum)
      // 暂存  redux中异步
      return previouState + selectNum
  }

  return previouState
}
