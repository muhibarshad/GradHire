import React, { useEffect, useState } from 'react'
import {
  Card,
  Input,
  Select,
  Row,
  Typography,
  Pagination,
  Col,
  Divider,
  Button,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import {
  MessageOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import Spinner from '../Spinner'
import { getAllUsers } from '../../util/api-call'

const UsersBanner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
        borderRadius: '5',
        backgroundColor: '#f2f2f2',
        padding: '50px 20px',
      }}
    >
      <Typography.Title level={3} style={{ marginBottom: '30px' }}>
        Connect with Professionals
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <UserOutlined
              style={{
                fontSize: '32px',
                marginBottom: '10px',
              }}
            />
            <Typography.Title level={5}>Find Users</Typography.Title>
            <Typography.Paragraph>
              Discover professionals and connect with them to expand your
              network
            </Typography.Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <MessageOutlined
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#52c41a',
              }}
            />
            <Typography.Title level={5}>Messaging</Typography.Title>
            <Typography.Paragraph>
              Send messages and connect with users to discuss opportunities
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <UsergroupAddOutlined
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#faad14',
              }}
            />
            <Typography.Title level={5}>Collaborate</Typography.Title>
            <Typography.Paragraph>
              Join groups and collaborate with other professionals to work on
              projects
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const UserPage = () => {
  const [usersData, setUsersData] = useState(null)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [searchInput, setSearchsearchInput] = useState('')

  useEffect(() => {
    // Do filtering here
    const filteredUsers = usersData?.filter((user) => {
      return user.name.toLowerCase().includes(searchInput.toLowerCase())
    })

    setFilteredUsers(filteredUsers)
  }, [searchInput])

  const navigate = useNavigate()

  const startIndex = (current - 1) * 12
  const endIndex = startIndex + 12

  const handleChange = (page) => {
    setCurrent(page)
  }
  // api call to get users
  useEffect(() => {
    async function getUsers() {
      try {
        setLoading(true)
        const res = await getAllUsers()
        console.log(res.data)
        setUsersData(res.data)
        setFilteredUsers(res.data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    getUsers()
  }, [])

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          padding: '20px 60px',
          // light blue background
        }}
      >
        <UsersBanner />
        <Divider />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 30,
          }}
        >
          <Input
            placeholder='Search User for connection or chat'
            style={{
              width: 900,
              fontSize: 18,
              height: 40,

              borderRadius: '15px',
              color: '#000',
            }}
            onChange={(e) => setSearchsearchInput(e.target.value)}
          />
        </div>

        {loading === true ? (
          <Spinner />
        ) : (
          <>
            {filteredUsers.length === 0 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '300px',
                  width: '100%',
                  fontSize: '18px',
                  // dark blue
                  color: '#0000ff',
                }}
              >
                <Divider />
                <h1
                  style={{
                    fontSize: '26px',
                    marginBottom: '20px',
                    color: 'black',
                  }}
                >
                  No Results Found
                </h1>
                <p style={{ fontSize: '18px' }}>
                  Try adjusting your search filters
                </p>

                <Button
                  type='primary'
                  style={{
                    width: '200px',
                    height: '50px',
                  }}
                  onClick={() => {
                    setSearchsearchInput('')
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <Row
                  gutter={[16, 16]}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {filteredUsers
                    .slice(startIndex, endIndex)
                    .map((user, index) => (
                      <Col
                        xs={24}
                        sm={12}
                        md={8}
                        lg={5}
                        key={index}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          border: '1px solid #f2f2f2',
                          gap: '10px',
                          padding: '20px 10px',
                          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                        }}
                      >
                        <img
                          src={`data:image/jpeg;base64, ${user.photo}`}
                          alt='user'
                          style={{
                            width: '200px',
                            height: '200px',
                            objectFit: 'cover',
                            marginTop: '20px',
                            borderRadius: '5px',
                          }}
                        />
                        <h5
                          style={{
                            fontsize: '20px',
                          }}
                        >
                          {user.name}
                        </h5>
                        <Button
                          type='primary'
                          block
                          style={{
                            width: '80%',
                            marginBottom: '20px',
                          }}
                          onClick={() => {
                            navigate(`/user/profile/${user._id}`)
                          }}
                        >
                          View Profile
                        </Button>
                      </Col>
                    ))}
                </Row>
                <Pagination
                  style={{
                    marginTop: '25px',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                  current={current}
                  onChange={handleChange}
                  total={filteredUsers.length}
                  pageSize={12}
                  showSizeChanger={false}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default UserPage
