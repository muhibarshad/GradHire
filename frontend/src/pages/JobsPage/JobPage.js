import React, { useEffect, useState } from 'react'
import {
  Card,
  Input,
  Select,
  Row,
  List,
  Button,
  Typography,
  Pagination,
  Col,
  Divider,
} from 'antd'
import {
  TeamOutlined,
  SearchOutlined,
  DollarOutlined,
  DollarCircleFilled,
  CalendarFilled,
  EnvironmentOutlined,
  BankOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { getAllJobs } from '../../util/api-call'
import Spinner from '../Spinner'

const { Option } = Select

const JobBanner = () => {
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
        Find Your Dream Job
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <SearchOutlined
              style={{
                fontSize: '32px',
                marginBottom: '10px',
              }}
            />
            <Typography.Title level={5}>Search Jobs</Typography.Title>
            <Typography.Paragraph>
              Explore job opportunities and find the perfect match for your
              skills and experience
            </Typography.Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card>
            <DollarCircleFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#52c41a',
              }}
            />
            <Typography.Title level={5}>Salary</Typography.Title>
            <Typography.Paragraph>
              Discover salary information and negotiate your compensation
              package
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <CalendarFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#faad14',
              }}
            />
            <Typography.Title level={5}>Flexible Schedule</Typography.Title>
            <Typography.Paragraph>
              Explore job opportunities with flexible schedules to fit your
              lifestyle
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
const JobsList = () => {
  const [jobsData, setJobsData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  const [sortOption, setSortOption] = useState('date') // Default sorting option

  const navigate = useNavigate()

  const [current, setCurrent] = useState(1)

  const handleChange = (page) => {
    setCurrent(page)
  }

  const startIndex = (current - 1) * 10
  const endIndex = startIndex + 10

  // Filters
  const [searchName, setSearchName] = useState(null)
  const [locationFilter, setLocationFilter] = useState(null)
  const [modeFilter, setModeFilter] = useState(null)
  const [typeFilter, setTypeFilter] = useState(null)
  const [salaryRangeFilter, setSalaryRangeFilter] = useState(null)

  // Function to handle sorting option change
  const handleSortChange = (value) => {
    setSortOption(value)
  }

  // api call to get jobs data
  useEffect(() => {
    const getJobsData = async () => {
      try {
        setLoading(true)
        const res = await getAllJobs()
        setJobsData(res.data.job)
        setFilteredData(res.data.job)
        setLoading(false)
      } catch (err) {
        //console.log(err)
        setLoading(false)
      }
    }

    getJobsData()
  }, [])

  // Filteration
  // For filtering companies
  useEffect(() => {
    filterData()
  }, [searchName, locationFilter, modeFilter, typeFilter, salaryRangeFilter])

  const filterData = () => {
    let tempData = [...jobsData]

    // If there is a search name, filter by name
    if (searchName) {
      tempData = tempData.filter((job) =>
        job.title.toLowerCase().includes(searchName.toLowerCase())
      )
    }

    // If there is a location filter, filter by location
    if (locationFilter) {
      tempData = tempData.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    }

    // If there is a type filter, filter by type
    if (typeFilter) {
      tempData = tempData.filter((company) => company.type === typeFilter)
    }

    // If there is a mode filter, filter by mode
    if (modeFilter) {
      tempData = tempData.filter((company) => company.mode === modeFilter)
    }

    // If there is a salary range filter, filter by salary range
    if (salaryRangeFilter) {
      tempData = tempData.filter(
        (company) =>
          company.salary >= salaryRangeFilter[0] &&
          company.salary <= salaryRangeFilter[1]
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

  const handleModeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === 'all') {
      setModeFilter(null)
      return
    }
    setModeFilter(value)
  }

  const handleTypeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === 'all') {
      setTypeFilter(null)
      return
    }
    setTypeFilter(value)
  }

  const handleSalaryRangeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === 'all') {
      setSalaryRangeFilter(null)
      return
    }
    // split the value into min and max
    const [min, max] = value.split('-')
    setSalaryRangeFilter({ min, max })
  }

  const resetFilters = () => {
    setSearchName(null)
    setLocationFilter(null)
    setModeFilter(null)
    setTypeFilter(null)
    setSalaryRangeFilter(null)
  }

  // Function to sort applicants based on the selected option
  const sortJobs = (a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title)
    } else if (sortOption === 'date') {
      return new Date(b.datePosted) - new Date(a.datePosted)
    }
    return 0
  }

  const sortedJobs = filteredData !== null && filteredData.sort(sortJobs)

  //console.log(sortedJobs)

  return (
    <>
      <div
        style={{
          minHeight: '100vh',
          padding: '20px 60px',
          // light blue background
        }}
      >
        <JobBanner />
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
            Filter Jobs
          </Typography.Title>

          {/* Search Fields */}
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
                <Option value='Full-Time'>Full Time</Option>
                <Option value='Part-Time'>Part Time</Option>
                <Option value='Contract'>Contract</Option>
                <Option value='Internship'>Internship</Option>
                <Option value='Other'>Others</Option>
              </Select>
            </div>

            <div className='filter-section'>
              <Select
                defaultValue='all'
                style={{ width: 150 }}
                onChange={handleModeFilter}
              >
                <Option value='all'>All Mode </Option>
                <Option value='Remote'>Remote</Option>
                <Option value='Onsite'>Onsite</Option>
                <Option value='Hybrid'>Hybrid</Option>
              </Select>
            </div>

            <div className='filter-section'>
              <Select
                defaultValue='all'
                style={{ width: 150 }}
                onChange={handleSalaryRangeFilter}
              >
                <Option value='all'>Salary Range</Option>
                <Option value='0-10000'>$0 - $10,000</Option>
                <Option value='10000-20000'>$10,000 - $20,000</Option>
                <Option value='20000-30000'>$20,000 - $30,000</Option>
                <Option value='30000-40000'>$30,000 - $40,000</Option>
                <Option value='40000-50000'>$40,000 - $50,000</Option>
                <Option value='50000-60000'>$50,000 - $60,000</Option>
              </Select>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Select
            defaultValue={sortOption}
            onChange={handleSortChange}
            style={{ width: 200 }}
          >
            <Option value='title'>Sort by Name</Option>
            <Option value='date'>Sort by Date</Option>
          </Select>
        </div>

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

        {loading && <Spinner />}

        {!loading && sortedJobs === null ? (
          <Spinner />
        ) : (
          <>
            {sortedJobs.length === 0 ? (
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
                  dataSource={sortedJobs.slice(startIndex, endIndex)}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => navigate(`/user/job/${item._id}`)}
                      style={{
                        width: '100%',
                        padding: '40px',
                        marginBottom: '20px',
                        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                          gap: '30px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#999',
                            marginTop: '5px',
                          }}
                        >
                          {/* Formate Date */}
                          Date Posted:{' '}
                          {new Date(item.datePosted).toLocaleDateString(
                            undefined,
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </p>

                        <List.Item.Meta
                          style={{ width: '95%' }}
                          title={
                            <h4
                              style={{ fontSize: '20px', color: '#1890ff' }}
                              href={`/company/${item.id}`}
                            >
                              {item.title}
                            </h4>
                          }
                          //  to 100 characters
                          description={item.description.slice(0, 200) + '.....'}
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
                          {item.location}
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
                          {item.type}
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
                          {item.mode}
                        </p>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <DollarOutlined
                            style={{
                              fontSize: '20px',
                              color: '#1890ff',
                            }}
                          />
                          {item.salaryRange}
                        </p>
                      </div>
                    </List.Item>
                  )}
                />
                <Pagination
                  style={{ textAlign: 'center', marginTop: '20px' }}
                  current={current}
                  onChange={handleChange}
                  total={sortedJobs.length}
                  pageSize={10}
                />
              </>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default JobsList
