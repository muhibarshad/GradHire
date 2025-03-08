import React from 'react'
import SideBox from './../Generic/SideBox'
import { Link } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from '../../util/api-call'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../../redux/user'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  // state
  const [form] = Form.useForm()
  const dispatch = useDispatch()

  const onFinish = async (values) => {
    setLoading(true)
    const userLogin = await login(values)
    //console.log(userLogin)

    if (userLogin.status === 'success') {
      messageApi.success('Login Successful')
      //console.log(userLogin)

      // save user to redux
      dispatch(
        loginSuccess({
          id: userLogin.data.id,
          token: userLogin.token,
          user: userLogin.data.user,
          role: 'user',
        })
      )

      setLoading(false)
      setTimeout(() => {
        // go to dashboard by default
        navigate('/user')
      }, 1000)
    } else {
      messageApi.error('Login Failed')
      setLoading(false)
    }
  }
  const onFinishFailed = (errorInfo) => {
    //console.log('Failed:', errorInfo)
  }

  return (
    <>
      {contextHolder}
      <div className='flex flex-wrap' style={{ height: '100vh' }}>
        <div className='hidden md:block md:w-6/12'>
          <SideBox image='illustrations2.png' imageClass='w-9/12 mt-16' />
        </div>

        <div className='w-full md:w-6/12 flex justify-center h-full'>
          <div className='w-full lg:w-8/12 2xl:w-8/12'>
            <div className='px-3 mt-20'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center'>
                    Welcome Back
                  </h1>
                  <p className='text-center'>
                    Please enter your account details to login.
                  </p>
                </div>

                <div className='mt-20'>
                  <Form
                    form={form}
                    name='basic'
                    layout='vertical'
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='on'
                  >
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                          type: 'email',
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Password'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div className='mt-3 check_input'>
                      <div className='w-100 text-end mb-1'>
                        <a
                          href='/forgetPassword'
                          className='text-blue-600 hover:text-blue-500'
                        >
                          Forgot Password
                        </a>
                      </div>
                    </div>
                    <Form.Item>
                      <Button
                        loading={loading}
                        style={{ height: '2.5rem' }}
                        size='small'
                        className='btn create_account_btn w-100 text-white bg-blue-600 hover:bg-blue-500'
                        htmlType='submit'
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Don't have an account?
                <Link to='/signup' className='ms-2 inline_link text-blue-600'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginForm
