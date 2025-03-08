import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBox from '../Generic/SideBox'
import { Col, Input, Row, Select, Upload } from 'antd'
import './../Generic/credForm.css'
import { Link } from 'react-router-dom'
import { Form, Button, message } from 'antd'
import { signUp } from '../../util/api-call'
import ImgCrop from 'antd-img-crop'

const { Option } = Select
const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()

  const [fileList, setFileList] = useState([])

  // Image Uploading via Model Logic
  const onImgChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow?.document.write(image.outerHTML)
  }
  const [form] = Form.useForm()

  const validatePasswordLength = (_, value) => {
    if (value && value.length < 8) {
      return Promise.reject('Password must be at least 8 characters')
    }
    return Promise.resolve()
  }

  const onFinish = async (values) => {
    setLoading(true)
    // if image is not uploaded
    if (!fileList[0]) {
      ////console.log('img errr')
      return messageApi.open({
        type: 'error',
        content: 'Please select an image',
      })
    }
    values.photo = fileList[0].originFileObj
    //console.log(values.photo)

    const res = await signUp(values)
    //console.log(res)
    if (res.status === 'success') {
      messageApi.open({
        type: 'success',
        content: 'You have signed up successfully!',
      })
      //console.log(res)
      localStorage.setItem('otp', res.data.otp)
      form.resetFields()
      setTimeout(() => {
        navigate('/verifyEmail')
      }, 1000)
      setLoading(false)
    } else if (res.status === 'fail') {
      messageApi.open({
        type: 'error',
        content: res.message,
      })
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
          <SideBox
            image='Group 614.png'
            width='320px'
            imageClass={'w-5/12 mt-48  mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center mt-32'>
                    Create Your Account
                  </h1>
                  <p className='text-center'>
                    Please provide all the required information.
                  </p>
                </div>

                <div className='mt-10 signup-form-fields pe-4'>
                  <Form
                    form={form}
                    name='basic'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout='vertical'
                    autoComplete='on'
                  >
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                      <ImgCrop rotationSlider>
                        <Upload
                          listType='picture-card'
                          fileList={fileList}
                          onChange={onImgChange}
                          onPreview={onPreview}
                          beforeUpload={() => false}
                        >
                          {fileList.length < 1 && '+ Profile'}
                        </Upload>
                      </ImgCrop>
                    </div>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label='Name'
                          name='name'
                          rules={[
                            {
                              required: true,
                              message: 'Please input your first name!',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label='Email'
                          name='email'
                          rules={[
                            {
                              required: true,
                              message: 'Please input your email!',
                            },
                            {
                              type: 'email',
                              message: 'Please enter a valid email!',
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label='Password'
                          name='password'
                          rules={[
                            {
                              required: true,
                              message: 'Please input your password!',
                            },
                            {
                              validator: validatePasswordLength,
                            },
                          ]}
                        >
                          <Input.Password />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          label='Confirm Password'
                          name='passwordConfirm'
                          dependencies={['password']}
                          rules={[
                            {
                              required: true,
                              message: 'Please confirm your password!',
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

                    <Form.Item>
                      <Button
                        style={{ height: '2.5rem' }}
                        size='small'
                        className='btn create_account_btn w-100'
                        htmlType='submit'
                        loading={loading}
                      >
                        Signup
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className='move_login text-center'>
              <p>
                Already have an account?
                <Link to='/login' className='ms-2 inline_link'>
                  Login
                </Link>
              </p>
              {/* <p>
                Create Organization account?
                <Link to='/signup/org' className='ms-2 inline_link'>
                  Create account
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
