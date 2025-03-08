import React from 'react'
import { Spin } from 'antd';


const Spinner=( { marginTop="12rem", size="large" } ) => {
  // size=small,middle,large
  return (
    <div className='w-50 mx-auto text-center'>
      <Spin tip="Loading..." style={{ marginTop }} size={size}>
      </Spin>
    </div>
  )
}
export default Spinner