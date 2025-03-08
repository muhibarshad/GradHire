import React from 'react'
import { Form, Input, Button, Card, Typography, Row, message } from 'antd'
import { sendEmail } from '../../../util/api-call'

const MakeEmail = ({ applicantId, onClose }) => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const values = form.getFieldsValue()

    try {
      const res = await sendEmail(applicantId, values)
      if (res.status === 'success') {
        onClose()
        message.success('Email sent successfully')
      } else {
        message.error('Email not sent')
      }

      //console.log(res)
    } catch (err) {
      message.error('Email not sent')
    }
  }

  return (
    <Card
      style={{
        width: '90%',
        margin: 'auto',
        marginTop: '50px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      }}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={4}>Send Customized Email</Typography.Title>
        {/* Skip Button */}
        <Button
          type='primary'
          danger
          style={{ marginLeft: '10px' }}
          onClick={onClose}
        >
          Skip
        </Button>
      </Row>

      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='Email Subject'
          name='subject'
          rules={[
            { required: true, message: 'Please enter the email subject' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Greeting'
          name='greeting'
          rules={[{ required: true, message: 'Please enter the greeting' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Email Body'
          name='body'
          rules={[{ required: true, message: 'Please enter the email body' }]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>
        <Form.Item
          label='Regards'
          name='regards'
          rules={[{ required: true, message: 'Please enter the regards' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Send Email
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default MakeEmail
