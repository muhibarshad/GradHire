import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Col, Row, message } from 'antd'
import { Form, Button, Input } from 'antd'
import SideBox from '../Generic/SideBox'
import { forgotPassword } from '../../util/api-call'

// State for storing the otp digits

const ForgetPassword = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

  const [form] = Form.useForm()

  // function for handling the submit button
  async function handleSubmit(e) {
    const { email } = form.getFieldsValue()

    const response = await forgotPassword({ email })
    if (response.status === 'success') {
      messageApi.success('Reset Link Sent to your Email')
      navigate('/login')
    } else {
      messageApi.error(response.message)
    }
  }
  return (
    <>
      {contextHolder}
      <div className='flex flex-wrap' style={{ height: '100vh' }}>
        <div className='hidden md:block md:w-6/12'>
          <SideBox
            image='Group 614.png'
            width='320px'
            imageClass={'w-5/12 mt-28 mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center mt-100'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-2xl font-bold text-center mt-56'>
                    Reset your password
                  </h1>
                  <p className='text-center text-base text-gray-600  mt-4'>
                    Enter the Email address associated with your account
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
                      <Row justify='space-between' span={24} gutter={[16, 16]}>
                        <Col span={24}>
                          <Form.Item
                            name='email'
                            label='Email'
                            style={{ width: '100%', height: '20px' }}
                            rules={[
                              {
                                required: true,
                                maxLength: 1,
                                message: 'Please enter your email!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>

                      <div className='mt-8'>
                        <Button
                          type='primary'
                          htmlType='submit'
                          className='w-full'
                        >
                          Send Reset Link
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Don't have an Account?
                <Link to='/signup' className='ms-2 inline_link'>
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgetPassword
