import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Forbidden() {
  const navigate = useNavigate()

  return (
    <>
      {' '}
      <div className='flex justify-center'>
        <div className='w-full md:w-10/12 lg:w-8/12 2xl:w-6/12'>
          <div className='w-100'>
            <img
              src={require('./../../img/403.svg').default}
              alt='svg'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          <div className='mt-14 text-center items-center'>
            <span className='mt-5 text-blue-900 text-3xl md:text-5xl xl:text-6xl font-semibold'>
              Access Denied
            </span>
            <p className='text-gray-500 font-medium px-3'>
              Sorry, but you don't have permission to access this page.
            </p>
            <div className='mt-4 flex flex-wrap justify-center'>
              <div>
                <button
                  type='button'
                  className='text-center inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2'
                  onClick={() => navigate(-1)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-5 h-5 mr-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    stroke-width='2'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      d='M11 17l-5-5m0 0l5-5m-5 5h12'
                    />
                  </svg>
                  Go back
                </button>
              </div>
              <div>
                <Link
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  to={'/'}
                >
                  Take me home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=' w-100  text-muted'>
        <hr />
        <div className='pb-3'>
          <div className='flex justify-center text-center space-x-6'>
            <div className='mt-2 text-xs'>
              <span>Alright reserved © 2022 Atilax</span>
            </div>
            <div className='mt-2 text-xs'>
              <span>Any Inquiry ?</span>
            </div>
            <div className='mt-2 text-xs'>
              <span>Privacy Policy | Terms &amp; Conditions</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
