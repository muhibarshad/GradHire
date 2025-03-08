import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { Col, Row, message } from 'antd'
import { Form, Button, Input } from 'antd'
import SideBox from '../Generic/SideBox'
// State for storing the otp digits
const EmailOtp = () => {
  const [messageApi, contextHolder] = message.useMessage()

  const navigate = useNavigate()

  const [form] = Form.useForm()

  // function for handling the submit button
  async function handleSubmit(e) {
    // if all the fields are filled then take otp from local storage
    let otp = localStorage.getItem('otp')
    // get the otp from the form
    const { digit1, digit2, digit3, digit4 } = form.getFieldsValue()
    // combine all the digits
    const otpValue = digit1 + digit2 + digit3 + digit4
    otp = localStorage.getItem('otp')
    if (otp === otpValue) {
      //  await verifyEmail(data)
      messageApi.success('Email Verified')

      // navigate to the next page after 1 sec
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } else {
      messageApi.error('Invalid OTP')
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
            imageClass={'w-5/12 mt-48 mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center mt-100'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-2xl font-bold text-center mt-56'>
                    Verify your email
                  </h1>
                  <p className='text-center text-base text-gray-600  mt-4'>
                    We have sent a 4-digit code to your email address. Please
                    enter the code in the box below to verify your email
                    address.
                  </p>
                </div>
                <div className='mt-8'>
                  <div>
                    <Form form={form} onFinish={handleSubmit}>
                      <Row
                        justify='space-between'
                        span={24}
                        gutter={[16, 16]}
                        style={{ width: '45%', margin: 'auto' }}
                      >
                        <Col span={6}>
                          <Form.Item
                            name='digit1'
                            style={{ width: '100%', height: '20px' }}
                            rules={[
                              {
                                required: true,
                                maxLength: 1,
                                message: 'Please input your digit!',
                              },
                            ]}
                          >
                            <Input
                              maxLength={1}
                              style={{ textAlign: 'center' }}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name='digit2'
                            style={{ width: '100%', height: '20px' }}
                            rules={[
                              {
                                required: true,
                                maxLength: 1,
                                message: 'Please input your digit!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name='digit3'
                            style={{ width: '100%', height: '20px' }}
                            rules={[
                              {
                                required: true,
                                maxLength: 1,
                                message: 'Please input your digit!',
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name='digit4'
                            style={{ width: '100%', height: '20px' }}
                            rules={[
                              {
                                required: true,
                                maxLength: 1,
                                message: 'Please input your digit!',
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
                          Verify
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Incorrect Email?
                <Link to='/signup' className='ms-2 inline_link'>
                  SignUp again
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailOtp
