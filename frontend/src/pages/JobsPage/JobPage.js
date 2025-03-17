import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  TeamOutlined,
  SearchOutlined,
  DollarOutlined,
  DollarCircleFilled,
  CalendarFilled,
  EnvironmentOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../util/api-call";
import Spinner from "../Spinner";

const { Option } = Select;

const JobBanner = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        width: "100%",
        borderRadius: "5",
        backgroundColor: "#f2f2f2",
        padding: { xs: "30px 15px", sm: "50px 20px" },
      }}
    >
      <Typography.Title
        level={3}
        style={{ marginBottom: "20px", textAlign: "center" }}
      >
        Find Your Dream Job
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card style={{ height: "100%" }}>
            <SearchOutlined
              style={{
                fontSize: { xs: "24px", sm: "32px" },
                marginBottom: "10px",
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
                fontSize: "32px",
                marginBottom: "10px",
                color: "#52c41a",
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
                fontSize: "32px",
                marginBottom: "10px",
                color: "#faad14",
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
  );
};
const JobsList = () => {
  const [jobsData, setJobsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortOption, setSortOption] = useState("date"); // Default sorting option

  const navigate = useNavigate();

  const [current, setCurrent] = useState(1);

  const handleChange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * 10;
  const endIndex = startIndex + 10;

  // Filters
  const [searchName, setSearchName] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [modeFilter, setModeFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [salaryRangeFilter, setSalaryRangeFilter] = useState(null);

  // Function to handle sorting option change
  const handleSortChange = (value) => {
    setSortOption(value);
  };

  // api call to get jobs data
  useEffect(() => {
    const getJobsData = async () => {
      try {
        setLoading(true);
        const res = await getAllJobs();
        setJobsData(res.data.job);
        setFilteredData(res.data.job);
        setLoading(false);
      } catch (err) {
        //console.log(err)
        setLoading(false);
      }
    };

    getJobsData();
  }, []);

  // Filteration
  // For filtering companies
  useEffect(() => {
    filterData();
  }, [searchName, locationFilter, modeFilter, typeFilter, salaryRangeFilter]);

  const filterData = () => {
    let tempData = [...jobsData];

    // If there is a search name, filter by name
    if (searchName) {
      tempData = tempData.filter((job) =>
        job.title.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    // If there is a location filter, filter by location
    if (locationFilter) {
      tempData = tempData.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // If there is a type filter, filter by type
    if (typeFilter) {
      tempData = tempData.filter((company) => company.type === typeFilter);
    }

    // If there is a mode filter, filter by mode
    if (modeFilter) {
      tempData = tempData.filter((company) => company.mode === modeFilter);
    }

    // If there is a salary range filter, filter by salary range
    if (salaryRangeFilter) {
      tempData = tempData.filter(
        (company) =>
          company.salary >= salaryRangeFilter[0] &&
          company.salary <= salaryRangeFilter[1]
      );
    }

    //set filtered data
    setFilteredData(tempData);
  };

  const handleNameSearch = (e) => {
    setSearchName(e.target.value);
  };

  const handleLocationFilter = (e) => {
    setLocationFilter(e.target.value);
  };

  const handleModeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === "all") {
      setModeFilter(null);
      return;
    }
    setModeFilter(value);
  };

  const handleTypeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === "all") {
      setTypeFilter(null);
      return;
    }
    setTypeFilter(value);
  };

  const handleSalaryRangeFilter = (value) => {
    // if all is selected, remove the filter
    if (value === "all") {
      setSalaryRangeFilter(null);
      return;
    }
    // split the value into min and max
    const [min, max] = value.split("-");
    setSalaryRangeFilter({ min, max });
  };

  const resetFilters = () => {
    setSearchName(null);
    setLocationFilter(null);
    setModeFilter(null);
    setTypeFilter(null);
    setSalaryRangeFilter(null);
  };

  // Function to sort applicants based on the selected option
  const sortJobs = (a, b) => {
    if (sortOption === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "date") {
      return new Date(b.datePosted) - new Date(a.datePosted);
    }
    return 0;
  };

  const sortedJobs = filteredData !== null && filteredData.sort(sortJobs);

  //console.log(sortedJobs)

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          padding: "10px",
          "@media (min-width: 576px)": {
            padding: "20px 30px",
          },
          "@media (min-width: 992px)": {
            padding: "20px 60px",
          },
        }}
      >
        <JobBanner />
        <Divider />

        <div
          className="filter-companies"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 30,
            width: "100%",
            borderRadius: 5,
            gap: 15,
            "@media (min-width: 576px)": {
              marginBottom: 50,
              gap: 20,
            },
          }}
        >
          <Typography.Title
            level={3}
            style={{
              marginBottom: 20,
              textAlign: "center",
              "@media (min-width: 576px)": { marginBottom: 30 },
            }}
          >
            Filter Jobs
          </Typography.Title>

          <Row
            gutter={[16, 16]}
            style={{
              width: "100%",
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <Col xs={24} md={12} lg={8}>
              <Input
                placeholder="Search by Name"
                name="searchName"
                style={{
                  fontSize: 16,
                  height: 40,
                  borderRadius: 8,
                  width: "100%",
                }}
                onChange={handleNameSearch}
              />
            </Col>

            <Col xs={24} md={12} lg={8}>
              <Input
                placeholder="Search by Location"
                name="searchLocation"
                style={{
                  fontSize: 16,
                  height: 40,
                  borderRadius: 8,
                  width: "100%",
                }}
                onChange={handleLocationFilter}
              />
            </Col>
          </Row>

          <Row
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 15,
              "@media (min-width: 576px)": {
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
              },
            }}
          >
            <Col xs={24} sm={8}>
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                onChange={handleTypeFilter}
              >
                <Option value="all">All Types</Option>
                <Option value="Full-Time">Full Time</Option>
                <Option value="Part-Time">Part Time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Internship">Internship</Option>
                <Option value="Other">Others</Option>
              </Select>
            </Col>

            <Col xs={24} sm={8}>
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                onChange={handleModeFilter}
              >
                <Option value="all">All Mode</Option>
                <Option value="Remote">Remote</Option>
                <Option value="Onsite">Onsite</Option>
                <Option value="Hybrid">Hybrid</Option>
              </Select>
            </Col>

            <Col xs={24} sm={8}>
              <Select
                defaultValue="all"
                style={{ width: "100%" }}
                onChange={handleSalaryRangeFilter}
              >
                <Option value="all">Salary Range</Option>
                <Option value="0-10000">$0 - $10,000</Option>
                <Option value="10000-20000">$10,000 - $20,000</Option>
                <Option value="20000-30000">$20,000 - $30,000</Option>
                <Option value="30000-40000">$30,000 - $40,000</Option>
                <Option value="40000-50000">$40,000 - $50,000</Option>
                <Option value="50000-60000">$50,000 - $60,000</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <div
          style={{
            marginBottom: 16,
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Select
            defaultValue={sortOption}
            onChange={handleSortChange}
            style={{ width: "100%", maxWidth: 200 }}
          >
            <Option value="title">Sort by Name</Option>
            <Option value="date">Sort by Date</Option>
          </Select>
        </div>

        <h1
          style={{
            fontSize: "26px",
            marginBottom: "20px",
            textAlign: "center",
            // dark blue
            color: "#0000ff",
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "300px",
                  width: "100%",
                  fontSize: "18px",
                  // dark blue
                  color: "#0000ff",
                }}
              >
                <Divider />
                <h1
                  style={{
                    fontSize: "26px",
                    marginBottom: "20px",
                    color: "black",
                  }}
                >
                  No Results Found
                </h1>
                <p style={{ fontSize: "18px" }}>
                  Try adjusting your search filters
                </p>

                <Button
                  type="primary"
                  style={{
                    width: "200px",
                    height: "50px",
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
                    width: "100%",
                    fontSize: "18px",
                    minHeight: "300px !important",
                  }}
                  itemLayout="horizontal"
                  dataSource={sortedJobs.slice(startIndex, endIndex)}
                  renderItem={(item) => (
                    <List.Item
                      onClick={() => navigate(`/user/job/${item._id}`)}
                      style={{
                        width: "100%",
                        padding: "20px",
                        marginBottom: 20,
                        boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                        "@media (min-width: 576px)": {
                          padding: "30px 40px",
                        },
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          flexDirection: "column",
                          gap: 20,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 15,
                          }}
                        >
                          <p style={{ fontSize: 14, color: "#999", margin: 0 }}>
                            Date Posted:{" "}
                            {new Date(item.datePosted).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>

                          <List.Item.Meta
                            style={{ margin: 0 }}
                            title={
                              <h4
                                style={{
                                  fontSize: 20,
                                  color: "#1890ff",
                                  margin: 0,
                                }}
                              >
                                {item.title}
                              </h4>
                            }
                            description={
                              <p style={{ margin: "10px 0 0 0" }}>
                                {item.description.slice(0, 200) + "....."}
                              </p>
                            }
                          />
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(150px, 1fr))",
                            gap: 15,
                            width: "100%",
                            "@media (min-width: 768px)": {
                              gridTemplateColumns: "repeat(4, 1fr)",
                            },
                          }}
                        >
                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              margin: 0,
                            }}
                          >
                            <EnvironmentOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                            {item.location}
                          </p>

                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              margin: 0,
                            }}
                          >
                            <TeamOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                            {item.type}
                          </p>

                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              margin: 0,
                            }}
                          >
                            <BankOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                            {item.mode}
                          </p>

                          <p
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              margin: 0,
                            }}
                          >
                            <DollarOutlined
                              style={{ fontSize: 20, color: "#1890ff" }}
                            />
                            {item.salaryRange}
                          </p>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
                <Pagination
                  style={{ textAlign: "center", marginTop: "20px" }}
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
  );
};

export default JobsList;
