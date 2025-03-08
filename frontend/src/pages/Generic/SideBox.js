import React from 'react'
import './sidebox.css'

const SideBox = (props) => {
  return (
    <div className='bg-blue-800 h-full justify-center'>
      <div className=''>
        <div className='w-100 flex justify-center'>
          <div className={props.imageClass}>
            <img
              src={require(`./../../img/${props.image}`)}
              style={{ width: '100%', height: '100%' }}
              alt='Login'
            />
          </div>
        </div>

        <div className='w-100 text-white'>
          <p className='font-bold text-2xl text-center mx-auto w-80'>
            {props.heading}
          </p>
          <p className='sub_heading text-center mx-auto w-6/12'>
            {props.subHeading}
          </p>
          <img
            src={require('./../../img/Group 615.png')}
            className='img-fluid pop_img'
            alt='popImg'
          />
        </div>
      </div>
    </div>
  )
}

export default SideBox
