import React, { useState, useEffect } from 'react'
import {
  Card,
  Input,
  Select,
  Row,
  Image,
  Space,
  List,
  Typography,
  Button,
  Pagination,
  Col,
  Divider,
} from 'antd'
import { getAllCompanies } from '../../util/api-call'
import Spinner from '../../pages/Spinner'

import { useJsApiLoader, Autocomplete } from '@react-google-maps/api'

import {
  TeamOutlined,
  SearchOutlined,
  StockOutlined,
  EnvironmentOutlined,
  BankOutlined,
} from '@ant-design/icons'
import Header from '../Header'
import { HeartFilled, EyeFilled, EnvironmentFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Option } = Select

// make a call to the server to get all the companies

const CompanyBanner = () => {
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
        Find Your Dream Company
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <HeartFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#FF0000',
              }}
            />
            <Typography.Title level={5}>Values & Work Culture</Typography.Title>
            <Typography.Paragraph>
              Connect with companies that share your values and work culture
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <EyeFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                // green
                color: '#52c41a',
              }}
            />
            <Typography.Title level={5}>Reviews & Ratings</Typography.Title>
            <Typography.Paragraph>
              Explore company reviews and ratings to make an informed decision
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <EnvironmentFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                // blue
                color: '#1890ff',
              }}
            />
            <Typography.Title level={5}>Location & Industry</Typography.Title>
            <Typography.Paragraph>
              Find companies in your desired location and industry with ease
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

const CompanyList = () => {
  // Map API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAlwf9wHwxVygoTP-_MehmYx1plLbzViVA',
    libraries: ['places'],
  })
  const navigate = useNavigate()

  // Data
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  // Filters
  const [searchName, setSearchName] = useState(null)
  const [locationFilter, setLocationFilter] = useState(null)
  const [sizeFilter, setSizeFilter] = useState(null)
  const [typeFilter, setTypeFilter] = useState(null)
  const [industryFilter, setIndustryFilter] = useState(null)

  // For fetching companies
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getAllCompanies()

      if (response.status === 'success') {
        //console.log(response.data.company)
        setData(response.data.company)
        setFilteredData(response.data.company)
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  // For filtering companies
  useEffect(() => {
    filterData()
  }, [searchName, locationFilter, sizeFilter, typeFilter, industryFilter])

  const [current, setCurrent] = useState(1)
  const handleChange = (page) => {
    setCurrent(page)
  }

  const startIndex = (current - 1) * 5
  const endIndex = startIndex + 5

  const filterData = () => {
    let tempData = [...data]

    // If there is a search name, filter by name
    if (searchName) {
      tempData = tempData.filter((company) =>
        company.name.toLowerCase().includes(searchName.toLowerCase())
      )
    }

    // If there is a location filter, filter by location
    if (locationFilter) {
      tempData = tempData.filter((company) =>
        company.address.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // If there is a size filter, filter by size
    if (sizeFilter) {
      tempData = tempData.filter((company) => company.size > sizeFilter)
    }

    // If there is a type filter, filter by type
    if (typeFilter) {
      tempData = tempData.filter((company) => company.type === typeFilter)
    }

    // If there is a industry filter, filter by industry
    if (industryFilter) {
      tempData = tempData.filter(
        (company) => company.industry === industryFilter
      )
    }
    //set filtered data
    setFilteredData(tempData)
  }

  const handleNameSearch = (e) => {
    setSearchName(e.target.value)
  }

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value)
  }
  const handleSizeFilter = (value) => {
    if (value === 'all') return setSizeFilter(null)
    setSizeFilter(value)
  }

  const handleTypeFilter = (value) => {
    if (value === 'all') return setTypeFilter(null)

    setTypeFilter(value)
  }

  const handleIndustryFilter = (value) => {
    if (value === 'all') return setIndustryFilter(null)
    setIndustryFilter(value)
  }

  const resetFilters = () => {
    setSearchName(null)
    setLocationFilter(null)
    setSizeFilter(null)
    setTypeFilter(null)
  }

  if (!isLoaded) return <Spinner />
  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          padding: '20px 60px',
          // light blue background
        }}
      >
        <CompanyBanner />
        <Divider />

        <div
          className='filter-companies'
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 50,
            width: '100%',
            borderRadius: '5',

            gap: '20px',
          }}
        >
          <Typography.Title level={3} style={{ marginBottom: '30px' }}>
            Filter Companies
          </Typography.Title>
          <Row
            gutter={[16, 16]}
            span={24}
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              width: '100%',
              gap: '20px',
            }}
          >
            <Col lg={8} md={12} sm={24} xs={24}>
              <Input
                placeholder='Search by Name'
                name='searchName'
                style={{
                  fontSize: 18,
                  height: 40,
                  borderRadius: 15,
                  color: '#000',
                }}
                onChange={handleNameSearch}
              />
            </Col>

            <Col lg={8} md={12} sm={24} xs={24}>
              <Input
                placeholder='Search by Location'
                name='searchLocation'
                style={{
                  fontSize: 18,
                  height: 40,

                  borderRadius: 15,
                  color: '#000',
                }}
                onChange={handleLocationFilter}
              />
            </Col>
          </Row>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '40px',
            }}
          >
            <div className='filter-section'>
              <Select
                defaultValue='all'
                style={{ width: 150 }}
                onChange={handleTypeFilter}
              >
                <Option value='all'>All Types</Option>
                <Option value='Public'>Public</Option>
                <Option value='Private'>Private</Option>
                <Option value='Self Employed'>Self Employed</Option>
                <Option value='Government'>Government</Option>
              </Select>
            </div>

            <div className='filter-section'>
              <Select
                defaultValue='all'
                style={{ width: 150 }}
                onChange={handleIndustryFilter}
              >
                <Option value='all'>All Industries</Option>
                <Option value='IT'>IT</Option>
                <Option value='Finance'>Finance</Option>
                <Option value='Manufacturing'>Manufacturing</Option>
                <Option value='Health'>Healthcare</Option>
                <Option value='Education'>Education</Option>
                <Option value='Construction'>Construction</Option>
                <Option value='Agriculture'>Agriculture</Option>
                <Option value='Other'>Other</Option>
              </Select>
            </div>

            <div className='filter-section'>
              <Select
                defaultValue='all'
                style={{ width: 150 }}
                onChange={handleSizeFilter}
              >
                <Option value='all'>All Sizes</Option>
                <Option value='10'>0-10 Employees</Option>
                <Option value='50'>11-50 Employees</Option>
                <Option value='200'>51-200 Employees</Option>
                <Option value='500'>201-500 Employees</Option>
                <Option value='501'>501+ Employees</Option>
              </Select>
            </div>
          </div>
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1
              style={{
                fontSize: '26px',
                marginBottom: '20px',
                textAlign: 'center',
                // dark blue
                color: '#0000ff',
              }}
            >
              Your Search Results
            </h1>

            {filteredData.length === 0 ? (
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
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <>
                <List
                  style={{
                    width: '100%',
                    fontSize: '18px',
                    minHeight: '300px !important',
                  }}
                  itemLayout='horizontal'
                  dataSource={filteredData.slice(startIndex, endIndex)}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => {
                        navigate(`/user/company/${item._id}`)
                      }}
                      style={{
                        width: '100%',
                        padding: '40px',
                        marginBottom: '20px',
                        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div
                        style={{
                          width: '90%',
                          marginRight: '40px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <img
                          src={`data:image/jpeg;base64, ${item.photo}`}
                          style={{
                            width: '120px',
                            height: '120px',
                            marginRight: '20px',
                          }}
                        />
                        <List.Item.Meta
                          title={
                            <h1
                              style={{ fontSize: '20px', color: '#1890ff' }}
                              href={`company/${item.id}`}
                            >
                              {item.name}
                            </h1>
                          }
                          description={
                            // make description shorter with see more

                            item.description.length > 150
                              ? item.description.substring(0, 150) + '...'
                              : item.description
                          }
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          marginRight: '30px',
                          justifyContent: 'space-between',
                          gap: '30px',
                          minWidth: '230px',
                        }}
                      >
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <EnvironmentOutlined
                            style={{
                              fontSize: '20px',
                              color: '#1890ff',
                            }}
                          />{' '}
                          {item.address}
                        </p>

                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <TeamOutlined
                            style={{
                              fontSize: '20px',
                              color: '#1890ff',
                            }}
                          />{' '}
                          {item.size}
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <BankOutlined
                            style={{
                              fontSize: '20px',
                              color: '#1890ff',
                            }}
                          />
                          {item.industry}
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <StockOutlined
                            style={{
                              fontSize: '20px',
                              color: '#1890ff',
                            }}
                          />
                          {item.type}
                        </p>
                      </div>
                    </List.Item>
                  )}
                />
                <Pagination
                  style={{
                    marginTop: '25px',
                    textAlign: 'center',
                    marginBottom: '16px',
                  }}
                  current={current}
                  pageSize={5}
                  total={filteredData.length}
                  onChange={handleChange}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default CompanyList
