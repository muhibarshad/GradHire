import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Col, Row, message } from 'antd'
import { Form, Button, Input } from 'antd'
import SideBox from '../Generic/SideBox'
import { useParams } from 'react-router-dom'
import { resetPassword } from '../../util/api-call'
// State for storing the otp digits
const ResetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const validatePasswordLength = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters')
    }
    return Promise.resolve()
  }

  const navigate = useNavigate()
  let { token } = useParams()

  const [form] = Form.useForm()

  // function for handling the submit button
  async function handleSubmit(e) {
    // take token from url params

    // take values from form
    const values = await form.validateFields()
    // send request to server
    //console.log(token, values)
    const res = await resetPassword(token, values)
    // if success
    if (res.status === 'success') {
      // show success message
      messageApi.open({
        type: 'success',
        content: 'Password reset successfully',
      })
      // redirect to login page
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
    // if error
    else {
      // show error message
      messageApi.open({
        type: 'error',
        content: res.message,
      })
    }
  }
  return (
    <>
      {contextHolder}
      <div className='flex flex-wrap' style={{ height: '100vh' }}>
        <div className='hidden md:block md:w-6/12'>
          <SideBox
            image='illustrations.png'
            width='320px'
            imageClass={'w-9/12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center mt-100'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className=''>
                  <h1 className='text-2xl font-bold text-center mt-48'>
                    Reset your password
                  </h1>
                  <p className='text-center text-base text-gray-600  mt-4'>
                    Enter the new password for your account
                  </p>
                </div>
                <div className='mt-8'>
                  <div>
                    <Form
                      form={form}
                      onFinish={handleSubmit}
                      layout='vertical'
                      autoComplete='on'
                    >
                      <Row justify='space-between' span={24}>
                        <Col span={24} style={{ marginTop: 0 }}>
                          <Form.Item
                            name='password'
                            label='Password'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Password!',
                              },
                              {
                                validator: validatePasswordLength,
                              },
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            name='passwordConfirm'
                            label='Confirm Password'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Password!',
                              },
                              {
                                validator: validatePasswordLength,
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue('password') === value
                                  ) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(
                                    'The two passwords that you entered do not match!'
                                  )
                                },
                              }),
                            ]}
                          >
                            <Input.Password />
                          </Form.Item>
                        </Col>
                      </Row>
                      <div>
                        <Button
                          type='primary'
                          htmlType='submit'
                          className='w-full'
                        >
                          Reset Password
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Password remembered?
                <Link to='/login    ' className='ms-2 inline_link'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
