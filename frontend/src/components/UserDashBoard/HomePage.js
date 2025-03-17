import {
  LikeOutlined,
  DislikeOutlined,
  UserOutlined,
  LaptopOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
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
} from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Spinner from "../../pages/Spinner";
import { getApplication, getFollowings } from "../../util/api-call";
import { useSelector } from "react-redux";

const { Meta } = Card;
const Stats = ({ stats }) => {
  const data = [
    {
      title: "Applied At",
      key: "1",
      value: `${stats.applied}`,
      icon: <LaptopOutlined style={{ color: "#1890ff", fontSize: "28px" }} />,
      bgColor: "#e6f7ff",
      borderColor: "#91d5ff",
    },
    {
      title: "Accepted",
      value: `${stats.accepted}`,
      key: "2",
      icon: (
        <UnorderedListOutlined style={{ color: "#52c41a", fontSize: "28px" }} />
      ),
      bgColor: "#f6ffed",
      borderColor: "#b7eb8f",
    },
    {
      title: "Rejected",
      value: `${stats.rejected}`,
      icon: <DislikeOutlined style={{ color: "#ff4d4f", fontSize: "28px" }} />,
      key: "3",
      bgColor: "#fff1f0",
      borderColor: "#ffa39e",
    },
  ];

  return (
    <Row gutter={[16, 16]}>
      {data.map((item) => (
        <Col xs={24} sm={12} md={8} lg={8} key={item.key}>
          <Card
            style={{
              backgroundColor: item.bgColor,
              border: `1px solid ${item.borderColor}`,
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.09)",
              },
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "8px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  padding: "12px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                {item.icon}
              </div>
              <div style={{ marginLeft: "16px", flex: 1 }}>
                <Typography.Text
                  style={{
                    fontSize: "16px",
                    color: "#595959",
                    display: "block",
                  }}
                >
                  {item.title}
                </Typography.Text>
                <Typography.Title
                  level={3}
                  style={{
                    margin: "4px 0 0 0",
                    color: "#262626",
                  }}
                >
                  {item.value}
                </Typography.Title>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const JobList = ({ applications }) => {
  const navigate = useNavigate();
  const data = applications;
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = data.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <>
      <List
        style={{
          width: "100%",
        }}
        dataSource={filteredData}
        renderItem={(item) => (
          <List.Item
            style={{
              width: "100%",
              padding: { xs: "16px", sm: "24px" },
              marginBottom: "16px",
              borderRadius: "12px",
              backgroundColor: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
              },
            }}
            onClick={() => navigate(`/user/job/${item.job._id}`)}
          >
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "16px",
                  marginBottom: "16px",
                }}
              >
                <Avatar
                  size={56}
                  style={{
                    backgroundColor: "#1890ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: "bold",
                    boxShadow: "0 2px 8px rgba(24,144,255,0.2)",
                  }}
                >
                  {item.job.title[0]}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <Typography.Title
                    level={4}
                    style={{
                      margin: 0,
                      marginBottom: "8px",
                      color: "#262626",
                    }}
                  >
                    {item.job.title}
                  </Typography.Title>
                  <Typography.Text
                    type="secondary"
                    style={{
                      fontSize: "14px",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    Applied on{" "}
                    {new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography.Text>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "12px",
                }}
              >
                <Tag
                  color={
                    item.status === "Pending"
                      ? "orange"
                      : item.status === "Accepted"
                      ? "blue"
                      : "red"
                  }
                  style={{
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    border: "none",
                    boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  }}
                >
                  {item.status}
                </Tag>

                <Button
                  type="primary"
                  style={{
                    borderRadius: "8px",
                    padding: "4px 20px",
                    height: "36px",
                    fontWeight: "500",
                    boxShadow: "0 2px 0 rgba(0,0,0,0.045)",
                  }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </List.Item>
        )}
      />

      <Pagination
        style={{
          marginTop: "24px",
          textAlign: "center",
          marginBottom: "16px",
        }}
        current={currentPage}
        pageSize={5}
        total={data.length}
        onChange={onPageChange}
      />
    </>
  );
};

const CompanyList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFollowings(user.id);
        //console.log(res)
        setData(res.data.companies);
        setLoading(false);
      } catch (err) {
        //console.log(err)
      }
    };
    fetchData();
  }, [user.id]);

  const [current, setCurrent] = useState(1);

  const handleChange = (page) => {
    setCurrent(page);
  };

  const startIndex = (current - 1) * 4;
  const endIndex = startIndex + 4;

  if (loading) {
    return <Spinner />;
  }
  if (data.length === 0) {
    return <div>No companies to show</div>;
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        {data.slice(startIndex, endIndex).map((company, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{
                height: "100%",
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "#f0f0f0",
              }}
              onClick={() => {
                navigate(`/user/company/${company._id}`);
              }}
              hoverable
              cover={
                <img
                  alt={company.name}
                  src={`data:image/jpeg;base64,${company.photo}`}
                  style={{
                    height: "200px",
                    objectFit: "contain",
                    padding: "10px",
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
        style={{ marginTop: "25px", textAlign: "center", marginBottom: "16px" }}
        current={current}
        pageSize={4}
        total={data.length}
        onChange={handleChange}
      />
    </>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getApplication(user.id);
        setApplications(res.data.data);
      } catch (err) {
        //console.log(err)
      }
    };
    fetchData();
  }, []);

  const stats = {
    applied: applications.length,
    accepted: applications.filter(
      (application) => application.status === "Accepted"
    ).length,
    rejected: applications.filter(
      (application) => application.status === "Rejected"
    ).length,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: { xs: "16px", sm: "24px", md: "32px" },
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          marginBottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <Typography.Title
          level={3}
          style={{
            margin: 0,
            fontSize: { xs: "24px", sm: "28px" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Here are your stats 👋
        </Typography.Title>
        <Button
          type="primary"
          size="large"
          style={{
            width: { xs: "100%", sm: "200px" },
            height: "40px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
          onClick={() => {
            navigate("/user/jobs");
          }}
        >
          Apply More
        </Button>
      </div>

      <Stats stats={stats} />
      <Divider />

      <Card
        title={
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontSize: { xs: "20px", sm: "24px" },
            }}
          >
            Jobs Where You Applied
          </Typography.Title>
        }
        style={{
          marginBottom: "24px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
        bodyStyle={{
          padding: { xs: "12px", sm: "20px" },
        }}
      >
        <JobList applications={applications} />
      </Card>

      <Card
        title={
          <Typography.Title
            level={4}
            style={{
              margin: 0,
              fontSize: { xs: "20px", sm: "24px" },
            }}
          >
            Companies You Follow
          </Typography.Title>
        }
        style={{
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
        bodyStyle={{
          padding: { xs: "12px", sm: "20px" },
        }}
      >
        <CompanyList />
      </Card>
    </div>
  );
};
export default HomePage;
