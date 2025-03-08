import React, { useEffect, useState } from 'react'

import {
  List,
  Avatar,
  Typography,
  Button,
  Tag,
  Select,
  Modal,
  Row,
  Col,
  Tooltip,
  message,
  Divider,
} from 'antd'
import {
  StarOutlined,
  UserOutlined,
  ArrowRightOutlined,
  FileOutlined,
} from '@ant-design/icons'

import Profile from '../../../pages/Profile/Profile'

import { useNavigate } from 'react-router-dom'

import { useParams } from 'react-router-dom'
import {
  acceptApplication,
  bookMarkApplication,
  getApplicationByJob,
  rejectApplication,
  unbookMarkApplication,
} from '../../../util/api-call'
import Spinner from '../../../pages/Spinner'
import MakeEmail from './MakeEmail'

const { Text } = Typography
const { Option } = Select

const ViewApplicants = () => {
  const { id } = useParams()

  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)
  const [messageApi, contextHolder] = message.useMessage()
  const [visible, setVisible] = useState(false)

  const [sortOption, setSortOption] = useState('bookmark') // Default sorting option

  // Dummy data

  // set the profile first applicant id if exist
  const [profileId, setProfileId] = useState(
    applicants.length > 0 ? applicants[0].user._id : null
  )
  const [currentApplicantID, setCurrentApplicantID] = useState(
    applicants.length > 0 ? applicants[0]._id : null
  )

  useEffect(() => {
    const getApplicants = async () => {
      try {
        setLoading(true)
        const res = await getApplicationByJob(id)

        if (res.status === 'success') {
          setApplicants(res.data.data)

          // set profile id
          setProfileId(res.data.data[0].user._id)
          setCurrentApplicantID(res.data.data[0]._id)

          setLoading(false)
        } else {
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
      }
    }

    getApplicants()
  }, [])

  // Function to handle sorting option change
  const handleSortChange = (value) => {
    setSortOption(value)
  }

  const handleBookMark = async (id) => {
    try {
      const res = await bookMarkApplication(id)
      if (res.status === 'success') {
        message.success('Bookmarked successfully')
        // set local applicants to bookmark also

        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.bookmarked = true
            }
            return applicant
          })
        )
      }
    } catch (err) {
      message.error('Can not bookmark')
    }
  }

  const handleUnBookMark = async (id) => {
    try {
      const res = await unbookMarkApplication(id)
      if (res.status === 'success') {
        message.success('Unbookmarked successfully')
        // set local applicants to bookmark also
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.bookmarked = false
            }
            return applicant
          })
        )
      }
    } catch (err) {
      message.error('Can not unbookmark')
    }
  }

  // Function to sort applicants based on the selected option
  const sortApplicants = (a, b) => {
    if (sortOption === 'name') {
      return a.user.name.localeCompare(b.user.name)
    } else if (sortOption === 'date') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOption === 'status') {
      return a.status.localeCompare(b.status)
    } else if (sortOption === 'bookmark') {
      return b.bookmarked - a.bookmarked
    }
    return 0
  }

  const sortedApplicants = applicants.sort(sortApplicants)

  // handler
  const handleRejection = async (id) => {
    try {
      const res = await rejectApplication(id)

      if (res.status === 'success') {
        message.success('Rejected successfully')
        // set local applicants to bookmark also
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.status = 'Rejected'
            }
            return applicant
          })
        )
        setVisible(true)
      } else {
        message.error('Can not reject')
      }
    } catch (err) {
      message.error('Can not reject')
    }
  }
  const handleAcceptance = async (id) => {
    try {
      const res = await acceptApplication(id)
      if (res.status === 'success') {
        message.success('Accepted successfully')
        // set local applicants to bookmark also
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.status = 'Accepted'
            }
            return applicant
          })
        )
        setVisible(true)
      } else {
        message.error('Can not accept')
      }
    } catch (err) {
      message.error('Can not accept')
    }
  }

  if (loading) return <Spinner />
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 60px',
      }}
    >
      {/* Title */}
      <Row
        span={24}
        width='100%'
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        {/* Applicants List with Icon */}
        <Col
          lg={11}
          md={12}
          sm={24}
          className='basicFlexRow'
          style={{
            marginBottom: '20px',
            gap: '10px',
          }}
        >
          {/* Icon */}

          <UserOutlined
            style={{
              fontSize: '25px',
              color: '#1890ff',
              border: '1px solid #1890ff',
              borderRadius: '50%',
              padding: '5px',
            }}
          />

          {/* Title */}
          <Text strong style={{ fontSize: '22px' }}>
            Applicants
          </Text>
        </Col>

        {/* Applicants Profile with Icon */}
        <Col
          lg={11}
          md={12}
          sm={24}
          className='basicFlexRow'
          style={{
            marginBottom: '20px',
            gap: '10px',
          }}
        >
          {/* Icon */}
          <FileOutlined
            style={{
              fontSize: '25px',
              color: '#1890ff',
              border: '1px solid #1890ff',
              borderRadius: '50%',
              padding: '5px',
            }}
          />

          {/* Title */}
          <Text strong style={{ fontSize: '22px' }}>
            Resume
          </Text>
        </Col>
      </Row>

      <Divider />

      {/* Sorting  */}
      <div style={{ marginBottom: '16px' }}>
        <Select
          defaultValue={sortOption}
          onChange={handleSortChange}
          style={{ width: 200 }}
        >
          <Option value='name'>Sort by Name</Option>
          <Option value='date'>Sort by Date</Option>
          <Option value='status'>Sort by Status</Option>
          <Option value='bookmark'>Sort by Bookmark</Option>
        </Select>
      </div>
      <Row
        span={24}
        width='100%'
        style={{
          display: 'flex',
          justifyContent: 'space-between',

          gap: '10px',
        }}
      >
        <Col
          lg={11}
          md={12}
          sm={24}
          style={{
            // make the applicants list scrollable if there are more than 5 applicants
            maxHeight: '800px',
            overflowY: 'auto',

            // make the applicants list responsive
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',

            // make the applicants list a border with padding
            border: '1px solid #f0f0f0',
            padding: '20px',
          }}
        >
          <List
            dataSource={sortedApplicants}
            renderItem={(applicant) => (
              <List.Item
                style={{
                  width: '100%',
                  padding: '40px',
                  marginBottom: '20px',

                  boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: '#1890ff',
                        verticalAlign: 'middle',
                      }}
                    >
                      {applicant.user.name[0]}
                    </Avatar>
                  }
                  title={<Text strong>{applicant.user.name}</Text>}
                  description={
                    <>
                      <Text type='secondary'>
                        {new Date(applicant.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </Text>
                      <br />
                      <Tag
                        style={{
                          marginTop: '10px',
                          marginBottom: '10px',
                        }}
                        color={
                          applicant.status === 'Accepted'
                            ? 'green'
                            : applicant.status === 'Rejected'
                            ? 'red'
                            : 'blue'
                        }
                      >
                        {applicant.status}
                      </Tag>
                    </>
                  }
                />

                {/* button to view resume */}

                <Tooltip
                  title={
                    applicant.bookmarked
                      ? 'Remove from Bookmarks'
                      : 'Add to Bookmarks'
                  }
                >
                  {applicant.bookmarked && (
                    <Button
                      shape='circle'
                      style={{
                        marginRight: '20px',
                      }}
                      onClick={() => {
                        handleUnBookMark(applicant._id)
                      }}
                    >
                      <StarOutlined
                        style={{
                          color: 'gold',
                        }}
                      />
                    </Button>
                  )}
                  {!applicant.bookmarked && (
                    <Button
                      shape='circle'
                      style={{
                        marginRight: '20px',
                      }}
                      onClick={() => {
                        handleBookMark(applicant._id)
                      }}
                    >
                      <StarOutlined
                        style={{
                          color: 'grey',
                        }}
                      />
                    </Button>
                  )}
                </Tooltip>
                <Tooltip title='View resume'>
                  <ArrowRightOutlined
                    size={40}
                    shape='circle'
                    style={{
                      marginRight: '10px',
                      fontSize: '20px',
                      color: '#1890ff',
                    }}
                    onClick={() => {
                      setProfileId(applicant.user._id)
                      setCurrentApplicantID(applicant._id)
                    }}
                  />
                </Tooltip>
              </List.Item>
            )}
          />
        </Col>
        <Col lg={11} md={12} sm={24}>
          <div
            style={{
              // make the applicants list scrollable if there are more than 5 applicants
              maxHeight: '750px',
              overflowY: 'auto',

              // make the applicants list responsive
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',

              // make the applicants list a border with padding
              border: '1px solid #f0f0f0',
              padding: '20px',
            }}
          >
            <Profile profileId={profileId} />
          </div>

          {/* Buttons for operations */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <Button
              type='primary'
              style={{ width: '48%' }}
              onClick={() => {
                handleAcceptance(currentApplicantID)
              }}
            >
              Accept
            </Button>
            <Button
              type='primary'
              danger
              style={{ width: '48%' }}
              onClick={() => {
                handleRejection(currentApplicantID)
              }}
            >
              Reject
            </Button>
          </div>
        </Col>
      </Row>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
        footer={null}
        width={800}
        height={800}
      >
        <MakeEmail
          applicantId={currentApplicantID}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </div>
  )
}

export default ViewApplicants
