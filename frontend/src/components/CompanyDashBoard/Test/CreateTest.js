import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Input,
  Select,
  Typography,
  Form,
  Row,
  Slider,
  InputNumber,
  Col,
  Button,
  Divider,
} from 'antd'

const { TextArea } = Input
const { Option } = Select

const CreateTest = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Form Percentage

  const [passingPercentage, setPassingPercentage] = useState(50)

  const handleSliderChange = (value) => {
    setPassingPercentage(value)
  }

  const handleInputNumberChange = (value) => {
    if (value === '') {
      setPassingPercentage('')
      return
    }
    setPassingPercentage(Number(value))
  }
  const handleSubmit = async (values) => {
    console.log(values)
    values.passingPercentage = passingPercentage
    //set the loading state to true
    setLoading(true)
    // set the data to local storage
    localStorage.setItem('testData', JSON.stringify(values))
    navigate('/company/setTestQuestions')
  }

  return (
    <>
      <Card
        style={{
          width: '60%',
          margin: 'auto',
          marginTop: '50px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Row gutter={[16, 16]}>
          <Typography.Title level={4}>Create Assessment</Typography.Title>
          {/* Skip button */}
          <Button
            type='primary'
            onClick={() => navigate('/company')}
            style={{
              marginLeft: 'auto',
              width: '100px',

              borderRadius: '5px',
              // error background color
              background: '#F5222D',
              color: 'white',
              border: 'none',
            }}
          >
            Skip
          </Button>
        </Row>

        <Form
          layout='vertical'
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: '30px' }}
        >
          <Form.Item
            label='Test Title'
            name='title'
            rules={[{ required: true, message: 'Please input a Test title' }]}
          >
            <Input placeholder='Test Title' />
          </Form.Item>
          <Form.Item
            label='Test Description'
            name='description'
            rules={[
              { required: true, message: 'Please input a Test description' },
              {
                min: 50,
                message: 'Test description must be at least 50 characters',
              },
            ]}
          >
            <TextArea placeholder='Test Description' rows={5} />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              {/* Enter Total Time for Test */}
              <Form.Item
                label='Total Time'
                name='time'
                rules={[
                  { required: true, message: 'Please input a Total Time' },
                ]}
              >
                <Input placeholder='Total Time in minutes' />
              </Form.Item>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='No of Questions'
                name='noOfQuestions'
                rules={[
                  {
                    required: true,
                    message: 'Please enter a valid number of questions (1-100)',
                  },
                ]}
              >
                <Input placeholder='No of Questions' />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              {/* Enter Passing Percentage */}
              <Form.Item label='Passing Percentage' name='passingPercentage'>
                <Slider
                  min={1}
                  max={100}
                  value={
                    typeof passingPercentage === 'number'
                      ? passingPercentage
                      : 0
                  }
                  onChange={handleSliderChange}
                />
                <InputNumber
                  min={1}
                  max={100}
                  style={{ marginLeft: 16 }}
                  value={passingPercentage}
                  onChange={handleInputNumberChange}
                />
              </Form.Item>
            </Col>

            {/* Instructions */}
            <Col lg={12} md={24} sm={24} xs={24}>
              {/* Enter Passing Percentage */}
              <Form.Item
                label='Test Instructions'
                name='testInstructions'
                rules={[
                  {
                    required: true,
                    message: 'Please enter Test Instructions',
                  },
                ]}
              >
                <TextArea placeholder='Test Instructions' rows={5} />
              </Form.Item>
            </Col>
          </Row>

          <Divider
            style={{
              color: '#333',
              fontWeight: 'normal',
              margin: '0.7rem 0px',
            }}
          />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  onClick={handleSubmit}
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  Start Creating Test
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default CreateTest
