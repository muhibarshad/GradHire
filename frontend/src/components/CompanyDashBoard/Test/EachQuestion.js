import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography, Select, Form } from 'antd'
const { Title } = Typography
const { Option } = Select
const EachQuestion = (props) => {
  const [question, setQuestion] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: '',
  })

  const [error, setError] = useState(false)
  const handleChange = (event) => {
    setQuestion({ ...question, [event.target.name]: event.target.value })

    console.log(question)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // validate the question data
    if (
      question.question === '' ||
      question.optionA === '' ||
      question.optionB === '' ||
      question.optionC === '' ||
      question.optionD === '' ||
      question.correctOption === ''
    ) {
      setError(true)
      return
    }

    props.addQuestion(question)
    setQuestion({
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctOption: '',
    })
  }

  const onFinish = () => {}

  return (
    <Card>
      <Form onFinish={onFinish} layout='vertical'>
        <Row gutter={16}>
          <Col xs={24} sm={24}>
            <Form.Item
              name='question'
              label='Question'
              rules={[
                {
                  required: true,
                  message: 'Please enter the question',
                },
              ]}
            >
              <Input.TextArea
                aria-label='Your Question'
                placeholder='Your Question'
                value={question.question}
                autoSize={{ minRows: 3, maxRows: 3 }}
                name='question'
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              name='optionA'
              label='Option A'
              rules={[
                {
                  required: true,
                  message: 'Please enter option A',
                },
              ]}
            >
              <Input
                value={question.optionA}
                placeholder='Option A'
                name='optionA'
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name='optionB'
              label='Option B'
              rules={[
                {
                  required: true,
                  message: 'Please enter option B',
                },
              ]}
            >
              <Input
                value={question.optionB}
                placeholder='Option B'
                name='optionB'
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              name='optionC'
              label='Option C'
              rules={[
                {
                  required: true,
                  message: 'Please enter option C',
                },
              ]}
            >
              <Input
                value={question.optionC}
                placeholder='Option C'
                name='optionC'
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name='optionD'
              label='Option D'
              rules={[
                {
                  required: true,
                  message: 'Please enter option D',
                },
              ]}
            >
              <Input
                value={question.optionD}
                placeholder='Option D'
                name='optionD'
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12}>
            <Form.Item
              name='correctOption'
              label='Correct Option'
              rules={[
                {
                  required: true,
                  message: 'Please select the correct option',
                },
              ]}
            >
              <Select
                value={question.correctOption}
                onChange={handleChange}
                name='correctOption'
                style={{ width: '100%' }}
              >
                <Option value='A'>A</Option>
                <Option value='B'>B</Option>
                <Option value='C'>C</Option>
                <Option value='D'>D</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                onClick={handleSubmit}
                // loading={loading}
                style={{ width: '100%' }}
              >
                Next
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default EachQuestion
