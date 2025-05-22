import React, { useState, useEffect } from "react";
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
  Grid,
} from "antd";
import { getAllCompanies } from "../../util/api-call";
import Spinner from "../../pages/Spinner";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import {
  TeamOutlined,
  SearchOutlined,
  StockOutlined,
  EnvironmentOutlined,
  BankOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { HeartFilled, EyeFilled, EnvironmentFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Option } = Select;
const { useBreakpoint } = Grid;

const CompanyBanner = () => {
  const screens = useBreakpoint();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
        width: "100%",
        borderRadius: "5px",
        backgroundColor: "#f2f2f2",
        padding: screens.xs ? "30px 15px" : "50px 20px",
      }}
    >
      <Typography.Title
        level={screens.xs ? 4 : 3}
        style={{ marginBottom: "30px", textAlign: "center" }}
      >
        Find Your Dream Company
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <HeartFilled
              style={{
                fontSize: screens.xs ? "24px" : "32px",
                marginBottom: "10px",
              }}
            />
            <Typography.Title level={5}>Values & Work Culture</Typography.Title>
            <Typography.Paragraph>
              Connect with companies that share your values and work culture
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <EyeFilled
              style={{
                fontSize: screens.xs ? "24px" : "32px",
                marginBottom: "10px",
              }}
            />
            <Typography.Title level={5}>Reviews & Ratings</Typography.Title>
            <Typography.Paragraph>
              Explore company reviews and ratings to make an informed decision
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card>
            <EnvironmentFilled
              style={{
                fontSize: screens.xs ? "24px" : "32px",
                marginBottom: "10px",
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
  );
};

const CompanyList = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAlwf9wHwxVygoTP-_MehmYx1plLbzViVA",
    libraries: ["places"],
  });
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState(null);
  const [locationFilter, setLocationFilter] = useState(null);
  const [sizeFilter, setSizeFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [industryFilter, setIndustryFilter] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getAllCompanies();
      if (response.status === "success") {
        setData(response.data.company);
        setFilteredData(response.data.company);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchName, locationFilter, sizeFilter, typeFilter, industryFilter]);

  const [current, setCurrent] = useState(1);
  const itemsPerPage = screens.xs ? 3 : 5;

  const handleChange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filterData = () => {
    let tempData = [...data];
    if (searchName) {
      tempData = tempData.filter((company) =>
        company.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }
    if (locationFilter) {
      tempData = tempData.filter((company) =>
        company.address.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }
   if (sizeFilter) {
     // sizeFilter is e.g. "11-50"
     const [min, max] = sizeFilter.split("-").map(Number);
     tempData = tempData.filter(
       (company) => company.size >= min && company.size <= max
     );
   }
    if (typeFilter) {
      tempData = tempData.filter((company) => company.type === typeFilter);
    }
    if (industryFilter) {
      tempData = tempData.filter(
        (company) => company.industry === industryFilter
      );
    }
    setFilteredData(tempData);
  };

  const handleNameSearch = (e) => setSearchName(e.target.value);
  const handleLocationFilter = (e) => setLocationFilter(e.target.value);
  const handleSizeFilter = (value) =>
    value === "all" ? setSizeFilter(null) : setSizeFilter(value);
  const handleTypeFilter = (value) =>
    value === "all" ? setTypeFilter(null) : setTypeFilter(value);
  const handleIndustryFilter = (value) =>
    value === "all" ? setIndustryFilter(null) : setIndustryFilter(value);

  const resetFilters = () => {
    setSearchName(null);
    setLocationFilter(null);
    setSizeFilter(null);
    setTypeFilter(null);
    setIndustryFilter(null);
  };

  if (!isLoaded) return <Spinner />;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: screens.xs ? "15px" : screens.sm ? "20px 30px" : "20px 60px",
      }}
    >
      <CompanyBanner />
      <Divider />

      <div
        className="filter-companies"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: screens.xs ? 30 : 50,
          width: "100%",
          gap: screens.xs ? "15px" : "20px",
        }}
      >
        <Typography.Title
          level={screens.xs ? 4 : 3}
          style={{
            marginBottom: screens.xs ? "20px" : "30px",
            textAlign: "center",
          }}
        >
          Filter Companies
        </Typography.Title>

        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Search by Name"
              value={searchName || ""}
              style={{
                fontSize: screens.xs ? "16px" : "18px",
                height: screens.xs ? "36px" : "40px",
                borderRadius: "15px",
              }}
              onChange={handleNameSearch}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder="Search by Location"
              value={locationFilter || ""}
              style={{
                fontSize: screens.xs ? "16px" : "18px",
                height: screens.xs ? "36px" : "40px",
                borderRadius: "15px",
              }}
              onChange={handleLocationFilter}
            />
          </Col>
        </Row>

        <Row
          gutter={[16, 16]}
          style={{ width: "100%", marginTop: screens.xs ? "10px" : "20px" }}
        >
          <Col xs={24} sm={8} md={8}>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleTypeFilter}
              size={screens.xs ? "middle" : "large"}
            >
              <Option value="all">All Types</Option>
              <Option value="Public">Public</Option>
              <Option value="Private">Private</Option>
              <Option value="Self Employed">Self Employed</Option>
              <Option value="Government">Government</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleIndustryFilter}
              size={screens.xs ? "middle" : "large"}
            >
              <Option value="all">All Industries</Option>
              <Option value="IT">IT</Option>
              <Option value="Finance">Finance</Option>
              <Option value="Manufacturing">Manufacturing</Option>
              <Option value="Health">Healthcare</Option>
              <Option value="Education">Education</Option>
              <Option value="Construction">Construction</Option>
              <Option value="Agriculture">Agriculture</Option>
              <Option value="Other">Other</Option>
            </Select>
          </Col>
          <Col xs={24} sm={8} md={8}>
            <Select
              defaultValue="all"
              style={{ width: "100%" }}
              onChange={handleSizeFilter}
              size={screens.xs ? "middle" : "large"}
            >
              <Option value="all">All Sizes</Option>
             + <Option value="0-10">0-10 Employees</Option>
+ <Option value="11-50">11-50 Employees</Option>
+ <Option value="51-200">51-200 Employees</Option>
+ <Option value="201-500">201-500 Employees</Option>
+ <Option value="501-9999">501+ Employees</Option>
            </Select>
          </Col>
        </Row>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Typography.Title
            level={screens.xs ? 4 : 3}
            style={{
              marginBottom: "20px",
              textAlign: "center",
              color: "#0000ff",
            }}
          >
            Your Search Results
          </Typography.Title>

          {filteredData.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
                width: "100%",
                textAlign: "center",
                padding: screens.xs ? "15px" : "20px",
              }}
            >
              <Typography.Title
                level={screens.xs ? 4 : 3}
                style={{ color: "black", marginBottom: "20px" }}
              >
                No Results Found
              </Typography.Title>
              <Typography.Paragraph
                style={{
                  fontSize: screens.xs ? "16px" : "18px",
                  color: "#0000ff",
                }}
              >
                Try adjusting your search filters
              </Typography.Paragraph>
              <Button
                type="primary"
                style={{
                  width: screens.xs ? "100%" : "200px",
                  height: screens.xs ? "40px" : "50px",
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
                  fontSize: screens.xs ? "14px" : "18px",
                  minHeight: "300px",
                }}
                dataSource={filteredData.slice(startIndex, endIndex)}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => navigate(`/user/company/${item._id}`)}
                    style={{
                      width: "100%",
                      padding: screens.xs ? "20px 15px" : "40px",
                      marginBottom: "20px",
                      boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: screens.xs ? "column" : "row",
                        alignItems: screens.xs ? "center" : "flex-start",
                        gap: screens.xs ? "15px" : "40px",
                      }}
                    >
                      <img
                        src={`data:image/jpeg;base64, ${item.photo}`}
                        style={{
                          width: screens.xs ? "100px" : "120px",
                          height: screens.xs ? "100px" : "120px",
                          objectFit: "contain",
                        }}
                        alt={item.name}
                      />
                      <div style={{ flex: 1 }}>
                        <h1
                          style={{
                            fontSize: screens.xs ? "18px" : "20px",
                            color: "#1890ff",
                            marginBottom: screens.xs ? "10px" : "15px",
                          }}
                        >
                          {item.name}
                        </h1>
                        <p
                          style={{
                            fontSize: screens.xs ? "14px" : "16px",
                            marginBottom: screens.xs ? "15px" : "20px",
                          }}
                        >
                          {item.description.length > (screens.xs ? 100 : 150)
                            ? item.description.substring(
                                0,
                                screens.xs ? 100 : 150
                              ) + "..."
                            : item.description}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: screens.xs ? "15px" : "30px",
                          minWidth: screens.xs ? "auto" : "230px",
                          marginTop: screens.xs ? "10px" : 0,
                        }}
                      >
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: screens.xs ? "14px" : "16px",
                          }}
                        >
                          <EnvironmentOutlined
                            style={{
                              fontSize: screens.xs ? "16px" : "20px",
                              color: "#1890ff",
                            }}
                          />
                          {item.address}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: screens.xs ? "14px" : "16px",
                          }}
                        >
                          <TeamOutlined
                            style={{
                              fontSize: screens.xs ? "16px" : "20px",
                              color: "#1890ff",
                            }}
                          />
                          {item.size}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: screens.xs ? "14px" : "16px",
                          }}
                        >
                          <BankOutlined
                            style={{
                              fontSize: screens.xs ? "16px" : "20px",
                              color: "#1890ff",
                            }}
                          />
                          {item.industry}
                        </p>
                        <p
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontSize: screens.xs ? "14px" : "16px",
                          }}
                        >
                          <StockOutlined
                            style={{
                              fontSize: screens.xs ? "16px" : "20px",
                              color: "#1890ff",
                            }}
                          />
                          {item.type}
                        </p>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
              <Pagination
                style={{
                  marginTop: "25px",
                  textAlign: "center",
                  marginBottom: "16px",
                }}
                current={current}
                pageSize={itemsPerPage}
                total={filteredData.length}
                onChange={handleChange}
                size={screens.xs ? "small" : "default"}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyList;
