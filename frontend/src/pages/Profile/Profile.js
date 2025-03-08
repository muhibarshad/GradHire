import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Col, Row, Divider, Button, Avatar, Card } from 'antd'

import Education from './EducationComponent'
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import Spinner from '../Spinner'
import { getUser } from '../../util/api-call'
import { useSelector } from 'react-redux'
import ProfessionalExperience from './WorkExperienceComponent'
import Projects from './ProjectsComponent'
import Achievements from './AchievementComponent'
import Skills from './SkillsComponent'

import { useParams } from 'react-router-dom'

const { Title, Text } = Typography

const Profile = ({ profileId }) => {
  const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  // take id from props if not then from url params

  const params = useParams()
  let id = profileId ? profileId : params.id

  const [currentUserId, setCurrentUserId] = useState(false)

  // check if user is logged in

  useEffect(() => {
    getUser(id)
      .then((res) => {
        if (res.data._id === user.id) setCurrentUserId(true)
        setProfile(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }, [id])

  const BasicInfo = () => {
    return (
      <Row justify='center'>
        <Col>
          <Row
            justify='center'
            style={{
              marginTop: '30px',
              marginBottom: '10px',
              fontSize: '20px',
            }}
          >
            <Avatar
              src={`data:image/jpeg;base64, ${profile.photo}`}
              size={150}
              icon={<UserOutlined />}
            />
          </Row>
          <Row
            justify='center'
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '20px',
            }}
          >
            <Title level={3}>{profile.name}</Title>
          </Row>

          <Row className='basicFlexRow'>
            {profile.address && (
              <Col className='basicFlexRow' gap='20px'>
                <EnvironmentOutlined
                  style={{ fontSize: '16px', color: '#08c' }}
                />{' '}
                <span> {profile.address}</span>
              </Col>
            )}

            <Col className='basicFlexRow'>
              <MailOutlined style={{ fontSize: '16px', color: '#08c' }} />{' '}
              <span> {profile.email}</span>
            </Col>

            {profile.phoneNo && (
              <Col className='basicFlexRow'>
                <PhoneOutlined style={{ fontSize: '16px', color: '#08c' }} />{' '}
                <span> {profile.phoneNo}</span>
              </Col>
            )}
          </Row>

          {/* Chat */}
          {!currentUserId && (
            <Row justify='center'>
              <Button
                type='primary'
                onClick={() => {
                  navigate('/user/chat')
                }}
                style={{ margin: '20px 0 0 0', padding: '0 20px' }}
              >
                {/* Icon */}
                Message
              </Button>
            </Row>
          )}
        </Col>
      </Row>
    )
  }

  if (loading) return <Spinner />
  return (
    <div
      style={{
        margin: '0 0 0 0',
        padding: '0 50px',
      }}
    >
      <BasicInfo />

      {/* If  no resume is uploaded */}
      {profile.resume === null ? (
        <Row justify='center'>
          <Divider />
          <Col span={8}>
            <Row justify='center'>
              <Title level={4}>No Resume Uploaded</Title>
            </Row>
            <Row justify='center'>
              {currentUserId && (
                <Button
                  type='primary'
                  onClick={() => {
                    navigate('/user/uploadResume')
                  }}
                >
                  Upload Resume
                </Button>
              )}
            </Row>
          </Col>
        </Row>
      ) : (
        <div className='basicFlexColumn'>
          <Divider />
          {/* Title and Summary */}
          <div>
            <Row justify='center'>
              <Col>
                <Row justify='center'>
                  <Title
                    level={3}
                    style={{
                      color: '#08c',
                    }}
                  >
                    {profile.resume.title}
                  </Title>
                </Row>
              </Col>
            </Row>

            <Row>
              <Col>
                <Row justify='center'>
                  <Text>{profile.resume.summary}</Text>
                </Row>
              </Col>
            </Row>
          </div>
          <Divider />

          <Education education={profile.resume.CV.education} />
          <Divider />
          <ProfessionalExperience experience={profile.resume.CV.workExp} />
          <Divider />
          <Projects projects={profile.resume.CV.project} />
          <Divider />
          <Achievements achievements={profile.resume.CV.achievement} />
          <Divider />
          <Skills skills={profile?.resume?.CV?.other?.skills || []} />
<Divider />
        </div>
      )}
    </div>
  )
}

export default Profile
