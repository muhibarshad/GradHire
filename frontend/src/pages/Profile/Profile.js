import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Col, Row, Divider, Button, Avatar, Card } from 'antd'
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MessageOutlined,
  UploadOutlined
} from '@ant-design/icons'
import Education from './EducationComponent'
import Spinner from '../Spinner'
import { getUser } from '../../util/api-call'
import { useSelector } from 'react-redux'
import ProfessionalExperience from './WorkExperienceComponent'
import Projects from './ProjectsComponent'
import Achievements from './AchievementComponent'
import Skills from './SkillsComponent'
import { useParams } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

const Profile = ({ profileId }) => {
  const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const params = useParams()
  let id = profileId ? profileId : params.id
  const [currentUserId, setCurrentUserId] = useState(false)

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
      <Card 
        style={{ 
          width: '100%', 
          marginBottom: '2rem',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Row gutter={[24, 24]} justify='center' align='middle'>
          <Col xs={24} sm={24} md={10} lg={8} xl={8}>
            <div style={{ 
              textAlign: 'center',
              padding: { xs: '1rem', sm: '1.5rem', md: '2rem' }
            }}>
              <Avatar
                src={`data:image/jpeg;base64, ${profile.photo}`}
                size={{ xs: 120, sm: 150, md: 400, lg: 350, xl: 500 }}
                icon={<UserOutlined />}
                style={{ 
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Title level={2} style={{ margin: 0, marginTop: '0.5rem' }}>{profile.name}</Title>
            </div>
          </Col>
          
          <Col xs={24} sm={24} md={14} lg={16} xl={16}>
            <Row gutter={[16, 16]}>
              {profile.address && (
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <EnvironmentOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                    <Text style={{ fontSize: '16px' }}>{profile.address}</Text>
                  </div>
                </Col>
              )}
              
              <Col xs={24} sm={24} md={12} lg={12}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <MailOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                  <Text style={{ fontSize: '16px' }}>{profile.email}</Text>
                </div>
              </Col>

              {profile.phoneNo && (
                <Col xs={24} sm={24} md={12} lg={12}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <PhoneOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                    <Text style={{ fontSize: '16px' }}>{profile.phoneNo}</Text>
                  </div>
                </Col>
              )}
            </Row>

            {!currentUserId && (
              <Row style={{ marginTop: '1.5rem' }}>
                <Col>
                  <Button
                    type='primary'
                    icon={<MessageOutlined />}
                    onClick={() => navigate('/user/chat')}
                    size="large"
                  >
                    Message
                  </Button>
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Card>
    )
  }

  if (loading) return <Spinner />

  return (
    <div style={{ 
      padding: { xs: '1rem', sm: '1.5rem', md: '2rem' },
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <BasicInfo />

      {profile.resume === null ? (
        <Card style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Title level={4}>No Resume Uploaded</Title>
          {currentUserId && (
            <Button
              type='primary'
              icon={<UploadOutlined />}
              onClick={() => navigate('/user/uploadResume')}
              style={{ marginTop: '1rem' }}
            >
              Upload Resume
            </Button>
          )}
        </Card>
      ) : (
        <div>
          <Card 
            style={{ 
              marginBottom: '2rem',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Title 
              level={3} 
              style={{
                color: '#1890ff',
                textAlign: 'center',
                marginBottom: '1rem'
              }}
            >
              {profile.resume.title}
            </Title>
            <Paragraph style={{ textAlign: 'center' }}>
              {profile.resume.summary}
            </Paragraph>
          </Card>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Education education={profile.resume.CV.education} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <ProfessionalExperience experience={profile.resume.CV.workExp} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Projects projects={profile.resume.CV.project} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card style={{ height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Achievements achievements={profile.resume.CV.achievement} />
              </Card>
            </Col>
            <Col xs={24}>
              <Card style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <Skills skills={profile?.resume?.CV?.other?.skills || []} />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  )
}

export default Profile
