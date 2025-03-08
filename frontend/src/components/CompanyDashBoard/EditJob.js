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
import { updateJob } from '../../util/api-call'

const { TextArea } = Input
const { Option } = Select

const EditJob = ({ job, closeHandle }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [skills, setSkills] = useState(job.skills)

  const handleAddSkill = (skill) => {
    if (skills.includes(skill)) {
      return message.error('Skill already exists')
    } else if (skill === '') {
      return message.error('Skill can not be empty')
    }
    setSkills([...skills, skill])
  }

  const handleRemoveSkill = (skillIndex) => {
    const newSkills = skills.filter((_, index) => index !== skillIndex)
    setSkills(newSkills)
  }

  const handleSubmit = async (values) => {
    values.skills = skills

    // validate the question data except salary range
    try {
      const res = await updateJob(job._id, values)

      if (res.status === 'success') {
        message.success('Job updated successfully')
        navigate(`/company/job/${job._id}`)
        closeHandle()
      } else {
        message.error(res.message)
      }
    } catch (err) {
      message.error('Something went wrong')
    }
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
          width: '90%',
          margin: 'auto',
          marginTop: '50px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography.Title level={4}>Edit Job</Typography.Title>

        <Form
          layout='vertical'
          form={form}
          onFinish={handleSubmit}
          style={{ marginTop: '30px' }}
        >
          <Form.Item label='Job Title' name='title'>
            {/* With default value */}
            <Input placeholder='Job Title' defaultValue={job.title} />
          </Form.Item>

          <Form.Item label='Job Description' name='description'>
            <TextArea
              placeholder='Job Description'
              defaultValue={job.description}
              style={{ height: '200px' }}
            />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item label='Location' name='location'>
                <Input placeholder='Location' defaultValue={job.location} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item label='Salary Range' name='salaryRange'>
                <Input
                  placeholder='Salary Range'
                  defaultValue={job.salaryRange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item label='Job Mode' name='mode'>
                <Select placeholder='Select a job mode' defaultValue={job.mode}>
                  <Option value='full-time'>Full-time</Option>
                  <Option value='part-time'>Part-time</Option>
                  <Option value='contract'>Contract</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item label='Job Type' name='type'>
                <Select placeholder='Select a job type' defaultValue={job.type}>
                  <Option value='remote'>Remote</Option>
                  <Option value='on-site'>On-site</Option>
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

              <Form.Item label='Skills' name='skills'>
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
                  Edit Job
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}

export default EditJob
