import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  LaptopOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  Col,
  Row,
  Tag,
  Pagination,
  Avatar,
  Card,
  Space,
  Typography,
  Button,
  Divider,
  List,
} from 'antd'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../pages/Spinner'
import { getApplication, getFollowings } from '../../util/api-call'
import { useSelector } from 'react-redux'

const { Meta } = Card
const Stats = ({ stats }) => {
  const data = [
    {
      title: 'Applied At',
      key: '1',
      value: `${stats.applied}`,
      icon: <LaptopOutlined style={{ color: '#cf1322', fontSize: '20px' }} />,
    },
    {
      title: 'Accepted',
      value: `${stats.accepted}`,
      key: '2',
      icon: (
        <UnorderedListOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
      ),
    },
    {
      title: 'Rejected',
      value: `${stats.rejected}`,
      icon: <DislikeOutlined style={{ color: '#ff4d4f', fontSize: '20px' }} />,
      key: '3',
    },
  ]

  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col xs={24} sm={12} md={8} lg={8}>
          <Card
            style={{ backgroundColor: '#e6f7ff', border: '1px solid #91d5ff' }}
            key={item.key}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {item.icon}
              <h5 style={{ margin: '0 0 0 10px' }}>{item.title}</h5>
              <p
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginLeft: 'auto',
                  paddingTop: '15px',
                }}
              >
                {item.value}
              </p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

const JobList = ({ applications }) => {
  const navigate = useNavigate()
  const data = applications
  //console.log(data)

  const [currentPage, setCurrentPage] = useState(1)

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const filteredData = data.slice((currentPage - 1) * 5, currentPage * 5)

  return (
    <>
      <List
        style={{
          width: '100%',
          fontSize: '18px',
          minHeight: '300px !important',
        }}
        dataSource={filteredData}
        renderItem={(item) => (
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
                <Avatar style={{ backgroundColor: '#1890ff' }}>
                  {item.job.title[0]}
                </Avatar>
              }
              title={<a href='/'>{item.job.title}</a>}
              description={
                <div
                  style={{
                    width: '100%',
                    gap: '5px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{}}>
                    <div>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <Tag
                      color={
                        item.status === 'Pending'
                          ? 'orange'
                          : item.status === 'Accepted'
                          ? 'blue'
                          : 'red'
                      }
                    >
                      {item.status}
                    </Tag>
                  </div>

                  <div>
                    <Button
                      type='primary'
                      onClick={() => navigate(`/user/job/${item.job._id}`)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />

      <Pagination
        style={{ marginTop: 20, textAlign: 'center' }}
        current={currentPage}
        pageSize={5}
        total={data.length}
        onChange={onPageChange}
      />

      <Button
        type='primary'
        style={{ width: '50%', display: 'block', margin: '20px auto' }}
        onClick={() => {
          navigate('/user/jobs')
        }}
      >
        Apply More
      </Button>
      <Divider />
    </>
  )
}

const CompanyList = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFollowings(user.id)
        //console.log(res)
        setData(res.data.companies)
        setLoading(false)
      } catch (err) {
        //console.log(err)
      }
    }
    fetchData()
  }, [user.id])

  const [current, setCurrent] = useState(1)

  const handleChange = (page) => {
    setCurrent(page)
  }

  const startIndex = (current - 1) * 4
  const endIndex = startIndex + 4

  if (loading) {
    return <Spinner />
  }
  if (data.length === 0) {
    return <div>No companies to show</div>
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.slice(startIndex, endIndex).map((company, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                height: '100%',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                backgroundColor: '#f0f0f0',
              }}
              onClick={() => {
                navigate(`/user/company/${company._id}`)
              }}
              hoverable
              cover={
                <img
                  alt={company.name}
                  src={`data:image/jpeg;base64,${company.photo}`}
                  style={{
                    height: '200px',
                    objectFit: 'contain',
                    padding: '10px',
                  }}
                />
              }
            >
              <Card.Meta title={company.name} description={company.address} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ marginTop: '25px', textAlign: 'center', marginBottom: '16px' }}
        current={current}
        pageSize={4}
        total={data.length}
        onChange={handleChange}
      />
    </>
  )
}

const HomePage = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const [applications, setApplications] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getApplication(user.id)
        setApplications(res.data.data)
      } catch (err) {
        //console.log(err)
      }
    }
    fetchData()
  }, [])

  const stats = {
    applied: applications.length,
    accepted: applications.filter(
      (application) => application.status === 'Accepted'
    ).length,
    rejected: applications.filter(
      (application) => application.status === 'Rejected'
    ).length,
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px 60px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={3}>
          Here are your stats 👋
        </Typography.Title>
        <Button
          type='primary'
          style={{ marginLeft: 'auto' }}
          onClick={() => {
            navigate('/user/jobs')
          }}
        >
          Apply More
        </Button>
      </div>
      <Stats stats={stats} />
      <Divider />

      <Typography.Title level={3}>Job Where you applied</Typography.Title>
      <JobList applications={applications} />

      <Typography.Title level={3}>Companies you Follow</Typography.Title>
      <CompanyList />
    </div>
  )
}
export default HomePage
