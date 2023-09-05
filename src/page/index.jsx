import React, {  useEffect, useState, useRef } from 'react'
import { Button, Tag, Divider } from 'antd'
 
// 函数组件

export default function Index() {
  const [value, setValue] = useState(0)
  const [testValue, setTest] = useState(0)
  const inputDom = useRef()
  useEffect(() => {
    // 在此可以执行任何带副作用操作
    console.log('value 更新了')
    return () => {
      //组件卸载前执行
      console.log('value 更新结束')
    }
  }, [value])
  useEffect(()=>{
    console.log("testValue 更新")
    return ()=>{
      console.log("testValue 更新结束")
    }
  },[testValue])
  function inputChange() {
    console.log(inputDom, inputDom.current.files)
  }
  return (
    <div className="IndexContent">
      <h1>我是默认的Index</h1>
      <Tag
        style={{
          fontSize: '26px',
          height: 'auto',
          width: 'auto',
          padding: '5px 10px'
        }}>
        {value}
      </Tag>
      <Tag
        style={{
          fontSize: '26px',
          height: 'auto',
          width: 'auto',
          padding: '5px 10px'
        }}>
        {' '}
        测试数字 {testValue}
      </Tag>
      <Divider />
      <input type="file" ref={inputDom} onChange={inputChange} />
      <Divider />

      <Button onClick={setValue.bind(null, value + 1)}>设置</Button>
      <Button onClick={setTest.bind(null, testValue + 1)}>设置测试数字</Button>
    </div>
  )
}
