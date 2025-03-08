import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Input,
  Select,
  Typography,
  Form,
  Row,
  Col,
  Button,
  message,
  Tag,
  Popover,
  Divider,
} from 'antd'
import { postJob } from '../../util/api-call'
import { useSelector } from 'react-redux'

const { TextArea } = Input
const { Option } = Select

const PostJob = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState([])

  const handleAddSkill = (skill) => {
    if (skills.includes(skill)) {
      return message.error('Skill already exists')
    } else if (skill === '') {
      return message.error('Skill can not be empty')
    }
    setSkills([...skills, skill])
    console.log(skills)
  }

  const handleRemoveSkill = (skillIndex) => {
    const newSkills = skills.filter((_, index) => index !== skillIndex)
    setSkills(newSkills)
  }

  const handleSubmit = async (values) => {
    setLoading(true)
    values.skills = skills
    values.company = user.companyID
    console.log(values)

    const response = await postJob(values)
    setLoading(false)

    if (response.status === 'success') {
      message.success('Job Posted Successfully')
      setTimeout(() => {
        navigate('/company')
      }, 1000)
    } else {
      message.error(response.message)
    }

    // navigate('/company/createTest')
    // validate the question data except salary range

    //    console.log(response)
  }

  const skillsContent = (
    <div>
      <Form.Item
        name='skill'
        style={{ marginBottom: 10 }}
        rules={[
          { required: true, message: 'Please input a skill' },
          {
            validator(_, value) {
              if (!value || value.trim().length > 0) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Skill can not be only spaces'))
            },
          },
        ]}
      >
        <Input placeholder='Skill' onPressEnter={form.submit} />
      </Form.Item>
      <Button
        style={{ width: '100%' }}
        type='primary'
        disabled={!form.getFieldValue('skill') === ''}
        onClick={(e) => {
          handleAddSkill(form.getFieldValue('skill'))
        }}
      >
        Add
      </Button>
    </div>
  )

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
        <Typography.Title level={4}>Post a Job</Typography.Title>

        <Form
          layout='vertical'
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: '30px' }}
        >
          <Form.Item
            label='Job Title'
            name='title'
            rules={[{ required: true, message: 'Please input a job title' }]}
          >
            <Input placeholder='Job Title' />
          </Form.Item>
          <Form.Item
            label='Job Description'
            name='description'
            rules={[
              { required: true, message: 'Please input a job description' },
              {
                min: 50,
                message: 'Job description must be at least 50 characters',
              },
            ]}
          >
            <TextArea placeholder='Job Description' rows={5} />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Location'
                name='location'
                rules={[{ required: true, message: 'Please input a location' }]}
              >
                <Input placeholder='Location' />
              </Form.Item>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Salary Range'
                name='salaryRange'
                rules={[
                  {
                    message:
                      'Please enter a valid salary range (1000-99999999)',
                  },
                ]}
              >
                <Input placeholder='Salary Range' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Job Type'
                name='type'
                rules={[
                  { required: true, message: 'Please select a job type' },
                ]}
              >
                <Select placeholder='Select a job type'>
                  <Option value='Full Time'>Full time</Option>
                  <Option value='Part Time'>Part time</Option>
                  <Option value='Contract'>Contract</Option>
                  <Option value='Internship'>Internship</Option>
                  <Option value='Others'>Others</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Job mode'
                name='mode'
                rules={[
                  { required: true, message: 'Please select a job mode' },
                ]}
              >
                <Select placeholder='Select a job mode'>
                  <Option value='Remote'>Remote</Option>
                  <Option value='OnSite'>On-site</Option>
                  <Option value='Hybrid'>Hybrid</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {skills.map((skill, index) => (
                <Popover
                  key={index}
                  content={
                    <Button
                      type='primary'
                      danger
                      onClick={() => handleRemoveSkill(index)}
                    >
                      Remove
                    </Button>
                  }
                >
                  <Tag
                    closable
                    onClose={() => handleRemoveSkill(index)}
                    style={{
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      alignContent: 'center',
                      alignItems: 'center',

                      background: '#f0f0f0',
                      padding: '4px 10px',
                      color: '#000',
                    }}
                  >
                    {skill}
                  </Tag>
                </Popover>
              ))}

              <Form.Item
                label='Skills'
                name='skills'
                rules={[
                  { required: true, message: 'Please add at least one skill' },
                ]}
              >
                <Row gutter={[16, 16]}>
                  <Popover content={skillsContent} trigger='click' span={24}>
                    <Button
                      type='dashed'
                      style={{
                        background: '#f0f0f0',
                        color: '#000',
                        width: '100%',
                      }}
                      disabled={skills.length >= 10}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Add Skill
                    </Button>
                  </Popover>
                </Row>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
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
                  Post Job
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default PostJob
