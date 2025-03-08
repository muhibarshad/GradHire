import React, { useState } from 'react'
import {
  Rate,
  Select,
  Form,
  Input,
  Button,
  message,
  Typography,
  Space,
  Row,
  Modal,
  Col,
} from 'antd'
import styles from './DashBoard.module.css'
import { useSelector } from 'react-redux'
import { postReview } from '../../util/api-call'
import { useNavigate } from 'react-router-dom'
const { Option } = Select

const ReviewPage = ({ company, handleCancel }) => {
  const user = useSelector((state) => state.user)

  //console.log(company)
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    setLoading(true)
    //console.log(values)

    // Send review data to server
    const data = {
      ...values,
      company: company,
      user: user.id,
    }

    const res = await postReview(data)
    if (res.status === 'success') {
      handleCancel()
      setTimeout(() => {
        setLoading(false)
        message.success('Review submitted successfully')
        // reset form
        form.resetFields()
        // redirect to company view page
      }, 1000)

      loading(false)
    } else {
      message.error(res.message)
      loading(false)
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <h1>Write a Review</h1>
      <Typography.Paragraph>
        Please rate the company and write a review
      </Typography.Paragraph>

      <Form form={form} onFinish={handleSubmit}>
        <Col>
          <Typography.Title level={5}>Title</Typography.Title>
          <Form.Item
            name='title'
            rules={[{ required: true, message: 'Please Enter a Title' }]}
          >
            <Input placeholder='Best Enviornment' name='title' />
          </Form.Item>
        </Col>
        <Col>
          <Typography.Title level={5}>Review</Typography.Title>
          <Form.Item
            name='rating'
            rules={[{ required: true, message: 'Please rate the company' }]}
          >
            <Rate
              allowHalf
              defaultValue={4.5}
              style={{ fontSize: 30, marginBottom: '-10px' }}
            />
          </Form.Item>
        </Col>

        <Col>
          <Typography.Title level={5}>Pros</Typography.Title>
          <Form.Item
            name='pros'
            rules={[
              { required: true, message: 'Please enter Pros of Company' },
            ]}
          >
            <Input placeholder='Growing Company' />
          </Form.Item>
        </Col>

        <Col>
          <Typography.Title level={5}>Cons</Typography.Title>
          <Form.Item
            name='cons'
            rules={[
              { required: true, message: 'Please enter Cons of Company' },
            ]}
          >
            <Input placeholder='No Cons' />
          </Form.Item>
        </Col>

        <Col>
          <Typography.Title level={5}>Review Description</Typography.Title>
          <Form.Item
            name='description'
            rules={[
              {
                required: true,
                message: 'Please enter a review description',
              },
              {
                max: 200,
                message: 'Review description cannot exceed 200 characters',
              },
            ]}
          >
            <Input.TextArea rows={4} maxLength={200} />
          </Form.Item>
        </Col>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ReviewPage
