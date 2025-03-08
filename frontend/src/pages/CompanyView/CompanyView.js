import {
  Space,
  Row,
  Col,
  Image,
  Typography,
  Button,
  message,
  Divider,
  Modal,
} from 'antd'
import { useState, useEffect } from 'react'
import ReviewPage from '../../components/UserDashBoard/GiveReview'
import Spinner from '../../pages/Spinner'

import {
  StarOutlined,
  CheckOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons'
import ReviewComponent from './ReviewComponent'
import { useNavigate, useParams } from 'react-router-dom'
import { getCompany } from '../../util/api-call'
import { useSelector } from 'react-redux'
import { addFollow } from '../../util/api-call'

const CompanyView = () => {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [company, setCompanyData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [messageApi, contextHolder] = message.useMessage()
  const { id } = useParams()

  const user = useSelector((state) => state.user)

  const handleCancel = () => {
    setVisible(false)
  }

  const handleGiveReview = () => {
    // check if the user has already given review

    // check if the user has already given review
    const flag = true
    company.reviews.map((review) => {
      //console.log(review.user._id, user.id)
      if (review.user._id === user.id) {
        setTimeout(() => {
          messageApi.error('You have already given a review')
        }, 1000)
        flag = false
      }
    })

    setVisible(flag)
  }

  useEffect(() => {
    setLoading(true)
    getCompany(id).then((res) => {
      setCompanyData(res.data)
      //console.log(res.data)
      setLoading(false)
    })
  }, [visible])

  const followCompany = async () => {
    // check if the user has already followed
    const flag = true
    company.followers.map((follower) => {
      //console.log(follower._id, user.id)
      if (follower._id === user.id) {
        setTimeout(() => {
          messageApi.error('You have already followed this company')
        }, 1000)
        flag = false
      }
    })
    if (flag) {
      // add the user to the followers list
      const data = {
        id: user.id,
      }
      const res = await addFollow(company._id, data)
      if (res.status === 'success') {
        // console.log(res.data)
        setCompanyData(res.data.company2)
        messageApi.success('You have successfully followed this company')
      } else {
        messageApi.error(res.message)
      }
    }
  }

  return (
    <>
      {contextHolder}
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <Row direction='vertical' style={{ padding: 20 }}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Row>
                <Row
                  span={12}
                  style={{
                    display: 'flex',
                    flex: '1',
                    gap: 16,
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={`data:image/jpeg;base64, ${company.photo}`}
                    alt='Image'
                    width={150}
                    height={150}
                  />
                  <Typography.Title level={2}>{company.name}</Typography.Title>
                </Row>
                {user.role !== 'company' && (
                  <Row
                    span={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flex: '1',
                      gap: 16,
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      type='primary'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      icon={<CheckOutlined />}
                      size='large'
                      onClick={followCompany}
                    >
                      {/* if follow than show following */}
                      {company.followers.includes(user.id)
                        ? 'Following'
                        : 'Follow'}
                    </Button>
                    <Button
                      type='primary'
                      icon={<StarOutlined />}
                      onClick={handleGiveReview}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      size='large'
                    >
                      Add a Review
                    </Button>
                  </Row>
                )}
                {user.role === 'company' && (
                  <Row
                    span={12}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flex: '1',
                      gap: 16,
                      alignItems: 'center',
                    }}
                  >
                    {/* back to dashboard button */}
                    <Button
                      type='primary'
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={() => navigate('/company')}
                      size='large'
                    >
                      Back to Dashboard
                    </Button>
                  </Row>
                )}
              </Row>
            </Col>
            <Modal
              visible={visible}
              onCancel={handleCancel}
              footer={null}
              width={800}
              height={800}
            >
              <ReviewPage company={company._id} handleCancel={handleCancel} />
            </Modal>

            <Col>
              <Col span={24} style={{ marginTop: 30 }}>
                <Space
                  direction='vertical'
                  style={{
                    padding: 20,
                    width: '100%',
                    border: '1px solid #d9d9d9',
                    borderRadius: 4,
                  }}
                >
                  <Row
                    span={8}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Company Type</strong>: {company.type}
                      </Typography>
                    </Col>
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Company Size:</strong> {company.size}
                      </Typography>
                    </Col>
                  </Row>
                  <Row
                    span={8}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Founded:</strong> {company.founded}
                      </Typography>
                    </Col>
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>CEO:</strong> {company.founder}
                      </Typography>
                    </Col>
                  </Row>
                  <Row
                    span={8}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Email:</strong> {company.email}
                      </Typography>
                    </Col>
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>website:</strong>{' '}
                        <a href='www.devsinc.com' target='_blank'>
                          {company.website}
                        </a>
                      </Typography>
                    </Col>
                  </Row>

                  <Row
                    span={8}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Address:</strong> {company.address}
                      </Typography>
                    </Col>
                    <Col span={12}>
                      <Typography style={{ fontSize: '16px' }}>
                        <strong>Industury Type:</strong> {company.industry}
                      </Typography>
                    </Col>
                  </Row>

                  {/* Social Links */}
                  {company.socialLinks && (
                    <Row
                      span={8}
                      style={{ display: 'flex', alignItems: 'center' }}
                    >
                      <Typography.Title
                        level={3}
                        style={{ fontSize: '16px', marginRight: '15px' }}
                      >
                        Social Links
                      </Typography.Title>

                      {company.socialLinks.map((social) => {
                        return (
                          <div>
                            {social.urlType == 'Facebook' && (
                              <a href={social.url} target='_blank'>
                                <FacebookOutlined
                                  style={{
                                    fontSize: '27px',
                                    color: '#3b5998',
                                    marginRight: '20px',
                                  }}
                                />
                              </a>
                            )}
                            {social.urlType === 'Twitter' && (
                              <a href={social.url} target='_blank'>
                                <TwitterOutlined
                                  style={{
                                    fontSize: '27px',
                                    color: '#1DA1F2',
                                    marginRight: '20px',
                                  }}
                                />
                              </a>
                            )}
                            {social.urlType === 'LinkedIn' && (
                              <a href={social.url} target='_blank'>
                                <LinkedinOutlined
                                  style={{
                                    fontSize: '27px',
                                    color: '#0e76a8',
                                    marginRight: '20px',
                                  }}
                                />
                              </a>
                            )}
                            {social.urlType === 'Instagram' && (
                              <a href={social.url} target='_blank'>
                                <InstagramOutlined
                                  style={{
                                    fontSize: '27px',
                                    color: '#c32aa3',
                                    marginRight: '20px',
                                  }}
                                />
                              </a>
                            )}
                            {social.urlType === 'Youtube' && (
                              <a href={social.url} target='_blank'>
                                <YoutubeOutlined
                                  style={{
                                    fontSize: '27px',
                                    color: '#c4302b',
                                    marginRight: '20px',
                                  }}
                                />
                              </a>
                            )}
                          </div>
                        )
                      })}
                    </Row>
                  )}

                  <Typography.Title style={{ marginTop: 10 }} level={4}>
                    Description
                  </Typography.Title>
                  <Typography style={{ fontSize: '16px' }}>
                    {company.description}
                  </Typography>
                </Space>
              </Col>
              <Typography.Title style={{ marginTop: 30 }} level={3}>
                Reviews
              </Typography.Title>
              <Space
                direction='vertical'
                style={{
                  padding: 20,
                  width: '100%',
                  border: '1px solid #d9d9d9',
                  borderRadius: 4,
                }}
              >
                {company?.reviews.length === 0 && (
                  <Typography style={{ fontSize: '16px' }}>
                    No reviews yet
                  </Typography>
                )}
                {company.reviews.map((review) => (
                  <>
                    <ReviewComponent review={review} />
                    <Divider />
                  </>
                ))}
              </Space>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default CompanyView
