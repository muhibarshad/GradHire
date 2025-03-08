import { useState } from 'react'

import { addCompany, postCompany } from '../../util/api-call'
import { useSelector, useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import ImgCrop from 'antd-img-crop'
import {
  Card,
  Input,
  Select,
  DatePicker,
  Typography,
  Form,
  Row,
  Col,
  Upload,
  Button,
  Divider,
  message,
  Tag,
  Popover,
} from 'antd'
import { switchRole, updateUser } from '../../redux/user'

const { TextArea } = Input
const { Option } = Select

const RegisterCompany = () => {
  // user
  const user = useSelector((state) => state.user)

  const [form] = Form.useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [links, setLinks] = useState([]) // links is the array of social urls

  const [messageApi, contextHolder] = message.useMessage()
  const [loading, setLoading] = useState(false)
  const [selectedYear, setSelectedYear] = useState(null)
  const [fileList, setFileList] = useState([]) // fileList is the array of images

  // add link
  const handleAddLink = (link) => {
    if (links.includes(link)) {
      return messageApi.open({
        type: 'error',
        content: 'Link already exists',
      })
    } else if (link === '') {
      return messageApi.open({
        type: 'error',
        content: 'Link can not be empty',
      })
    }
    setLinks([...links, link])
    ////console.log(links)
  }

  // remove link
  const handleRemoveLink = (linkIndex) => {
    const newLinks = links.filter((_, index) => index !== linkIndex)
    setLinks(newLinks)
  }

  // image upload
  const onImgChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }
  // image preview
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

  const onDateChange = (value, dateString) => {
    setSelectedYear(dateString)
  }

  // form submit | API call
  const handleSubmit = async () => {
    if (!fileList[0]) {
      //console.log('img errr')
      return messageApi.open({
        type: 'error',
        content: 'Please select an image',
      })
    }
    const values = await form.validateFields()
    values.photo = fileList[0].originFileObj
    values.establishedSince = selectedYear

    values.socialLinks = links
    values.users = [user.id]
    //console.log(values)
    // setLoading(true)
    // API call
    setLoading(true)
    const res = await postCompany(values)

    if (res.status === 'success') {
      //console.log(res.data)
      const UserData = {
        companyId: res.data._id,
      }

      const res2 = await addCompany(user.id, UserData)
      dispatch(updateUser(res2.data))

      if (res2.status === 'success') {
        // switch roles
        dispatch(
          switchRole({
            companyID: res.data._id,
            role: 'company',
          })
        )
        setLoading(false)
        navigate('/company')
      } else {
        setLoading(false)
        messageApi.open({
          type: 'error',
          content: res2.message,
        })
      }
    } else {
      setLoading(false)
      messageApi.open({
        type: 'error',
        content: res.message,
      })
    }
  }

  // Link addition popover
  const linkContent = (
    <>
      <Form.Item name='urlType' style={{ marginBottom: 10 }}>
        <Select placeholder='Select a link type'>
          <Option value='Facebook'>Facebook</Option>
          <Option value='Twitter'>Twitter</Option>
          <Option value='Linkedin'>LinkedIn</Option>
          <Option value='Instagram'>Instagram</Option>
          <Option value='Youtube'>Youtube</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name='url'
        style={{ marginBottom: 10 }}
        rules={[
          {
            validator: (_, value) => {
              if (
                !value ||
                value.match(
                  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
                )
              ) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Enter a valid link'))
            },
          },
        ]}
      >
        <Input placeholder='Enter a link' />
      </Form.Item>

      <Button
        style={{ width: '100%' }}
        type='primary'
        disabled={links.length >= 5}
        onClick={() => {
          form
            .validateFields(['urlType', 'url'])
            .then((values) => {
              handleAddLink(values)
            })
            .catch((info) => {
              //console.log('Validate Failed:', info)
            })
        }}
      >
        Add
      </Button>
    </>
  )

  // Original Page
  return (
    <>
      {contextHolder}

      <Card
        style={{
          width: '60%',
          margin: 'auto',
          marginTop: '50px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography.Title level={3}>Register Your Company</Typography.Title>

        <Form
          layout='vertical'
          form={form}
          onFinish={handleSubmit}
          onFinishFailed={(errorInfo) => {
            messageApi.open({
              type: 'error',
              content: 'Please fill all the required fields',
            })
            //console.log(errorInfo)
          }}
          style={{ marginTop: '30px' }}
        >
          <Row gutter={[16, 16]} justify='center'>
            <Col span={24}>
              <ImgCrop rotate>
                <Upload
                  listType='picture-card'
                  fileList={fileList}
                  onChange={onImgChange}
                  onPreview={onPreview}
                  beforeUpload={() => false}
                >
                  {fileList.length < 1 && '+ Logo'}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Company Name'
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Please input your company name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='CEO/Head'
                name='headName'
                rules={[
                  {
                    required: true,
                    message: 'Please input your CEO/Head name!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input type='email' />
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Website'
                name='website'
                rules={[
                  {
                    required: true,
                    message: 'Please input your website!',
                  },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        value.match(
                          /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}$/
                        )
                      ) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Enter a valid link'))
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Phone'
                name='phone'
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!',
                  },
                ]}
              >
                <Input type='number' />
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Address'
                name='address'
                type='text'
                rules={[
                  {
                    required: true,
                    message: 'Please input your address!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item label='Established Date' name='establishedDate'>
                <DatePicker
                  picker='year'
                  onChange={onDateChange}
                  style={{
                    width: '100%',
                  }}
                />
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Company Type'
                name='type'
                rules={[
                  {
                    required: true,
                    message: 'Please choose your Company type!',
                  },
                ]}
              >
                <Select>
                  <Select.Option value='Public'>Public</Select.Option>
                  <Select.Option value='Private'>Private</Select.Option>
                  <Select.Option value='Government'>Government</Select.Option>
                  <Select.Option value='Self Employed'>
                    Self Employed
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Company Size'
                name='size'
                rules={[
                  {
                    required: true,
                    message: 'Please input your company size!',
                  },
                ]}
              >
                <Input type='number' />
              </Form.Item>
            </Col>

            <Col lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label='Company Industry'
                name='industry'
                rules={[
                  {
                    required: true,
                    message: 'Please choose your company industry!',
                  },
                ]}
              >
                <Select>
                  <Select.Option value='IT'>IT</Select.Option>
                  <Select.Option value='Finance'>Finance</Select.Option>
                  <Select.Option value='Health'>Health</Select.Option>
                  <Select.Option value='Education'>Education</Select.Option>
                  <Select.Option value='Agriculture'>Agriculture</Select.Option>
                  <Select.Option value='Manufacturing'>
                    Manufacturing
                  </Select.Option>
                  <Select.Option value='Construction'>
                    Construction
                  </Select.Option>
                  <Select.Option value='Transportation'>
                    Transportation
                  </Select.Option>
                  <Select.Option value='Other'>Other</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label='Company Description'
                name='description'
                rules={[
                  {
                    required: true,
                    message: 'Please input your company description!',
                  },
                  {
                    min: 50,
                    message: 'Description must be at least 50 characters',
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              {links.map((link, index) => (
                <Popover
                  key={index}
                  content={
                    <Button
                      type='primary'
                      danger
                      onClick={() => handleRemoveLink(index)}
                    >
                      Remove
                    </Button>
                  }
                >
                  <Tag
                    closable
                    onClose={() => handleRemoveLink(index)}
                    style={{
                      fontSize: '14px',
                      fontFamily: 'monospace',

                      background: '#f0f0f0',
                      padding: '4px 10px',
                      color: '#000',
                    }}
                  >
                    {link.url}
                  </Tag>
                </Popover>
              ))}

              <Form.Item
                label='Social Links'
                name='socialLinks'
                rules={[
                  { required: true, message: 'Please add at least one skill' },
                ]}
              >
                <Row gutter={[16, 16]}>
                  <Popover content={linkContent} trigger='click' span={24}>
                    <Button
                      type='dashed'
                      style={{
                        background: '#f0f0f0',
                        color: '#000',
                        width: '100%',
                      }}
                      disabled={links.length >= 5}
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Add Link
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
                  loading={loading}
                  style={{ width: '100%' }}
                >
                  Register Company
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  )
}
export default RegisterCompany
