import React, { useEffect, useState } from "react";
import {
  List,
  Avatar,
  Typography,
  Button,
  Tag,
  Select,
  Modal,
  Row,
  Col,
  Tooltip,
  message,
  Divider,
} from "antd";
import {
  StarOutlined,
  UserOutlined,
  ArrowRightOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Profile from "../../../pages/Profile/Profile";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  acceptApplication,
  bookMarkApplication,
  getApplicationByJob,
  rejectApplication,
  unbookMarkApplication,
} from "../../../util/api-call";
import Spinner from "../../../pages/Spinner";
import MakeEmail from "./MakeEmail";

const { Text } = Typography;
const { Option } = Select;

const ViewApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [visible, setVisible] = useState(false);
  const [sortOption, setSortOption] = useState("bookmark");
  const [profileId, setProfileId] = useState(null);
  const [currentApplicantID, setCurrentApplicantID] = useState(null);

  useEffect(() => {
    const getApplicants = async () => {
      try {
        setLoading(true);
        const res = await getApplicationByJob(id);

        if (res.status === "success") {
          setApplicants(res.data.data);
          if (res.data.data.length > 0) {
            setProfileId(res.data.data[0].user._id);
            setCurrentApplicantID(res.data.data[0]._id);
          }
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };

    getApplicants();
  }, [id]);

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const handleBookMark = async (id) => {
    try {
      const res = await bookMarkApplication(id);
      if (res.status === "success") {
        message.success("Bookmarked successfully");
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.bookmarked = true;
            }
            return applicant;
          })
        );
      }
    } catch (err) {
      message.error("Can not bookmark");
    }
  };

  const handleUnBookMark = async (id) => {
    try {
      const res = await unbookMarkApplication(id);
      if (res.status === "success") {
        message.success("Unbookmarked successfully");
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.bookmarked = false;
            }
            return applicant;
          })
        );
      }
    } catch (err) {
      message.error("Can not unbookmark");
    }
  };

  const sortApplicants = (a, b) => {
    if (sortOption === "name") {
      return a.user.name.localeCompare(b.user.name);
    } else if (sortOption === "date") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortOption === "status") {
      return a.status.localeCompare(b.status);
    } else if (sortOption === "bookmark") {
      return b.bookmarked - a.bookmarked;
    }
    return 0;
  };

  const sortedApplicants = [...applicants].sort(sortApplicants);

  const handleRejection = async (id) => {
    try {
      const res = await rejectApplication(id);
      if (res.status === "success") {
        message.success("Rejected successfully");
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.status = "Rejected";
            }
            return applicant;
          })
        );
        setVisible(true);
      } else {
        message.error("Can not reject");
      }
    } catch (err) {
      message.error("Can not reject");
    }
  };

  const handleAcceptance = async (id) => {
    try {
      const res = await acceptApplication(id);
      if (res.status === "success") {
        message.success("Accepted successfully");
        setApplicants(
          applicants.map((applicant) => {
            if (applicant._id === id) {
              applicant.status = "Accepted";
            }
            return applicant;
          })
        );
        setVisible(true);
      } else {
        message.error("Can not accept");
      }
    } catch (err) {
      message.error("Can not accept");
    }
  };

  if (loading) return <Spinner />;
  
  return (
    <div style={{ padding: "20px", maxWidth: "100vw", overflowX: "hidden" }}>
      {contextHolder}
      
      {/* Title Section */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <UserOutlined
              style={{
                fontSize: "clamp(20px, 2.5vw, 25px)",
                color: "#1890ff",
                border: "1px solid #1890ff",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
            <Text strong style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
              Applicants
            </Text>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <FileOutlined
              style={{
                fontSize: "clamp(20px, 2.5vw, 25px)",
                color: "#1890ff",
                border: "1px solid #1890ff",
                borderRadius: "50%",
                padding: "5px",
              }}
            />
            <Text strong style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
              Resume
            </Text>
          </div>
        </Col>
      </Row>

      <Divider />

      {/* Sorting Section */}
      <div style={{ marginBottom: "16px" }}>
        <Select
          defaultValue={sortOption}
          onChange={handleSortChange}
          style={{ width: "100%", maxWidth: "200px" }}
        >
          <Option value="name">Sort by Name</Option>
          <Option value="date">Sort by Date</Option>
          <Option value="status">Sort by Status</Option>
          <Option value="bookmark">Sort by Bookmark</Option>
        </Select>
      </div>

      {/* Main Content Section */}
      <Row gutter={[24, 24]} style={{ width: "100%", margin: 0 }}>
        {/* Applicants List */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={11}
          style={{
            height: "600px",
            overflowY: "auto",
            border: "1px solid #f0f0f0",
            borderRadius: "12px",
            padding: "20px",
            background: "#fff",
          }}
        >
          {sortedApplicants.length > 0 ? (
            <List
              dataSource={sortedApplicants}
              renderItem={(applicant) => (
                <List.Item
                  style={{
                    padding: "16px",
                    marginBottom: "16px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "8px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        style={{
                          backgroundColor: "#1890ff",
                          marginRight: "12px",
                        }}
                        size="large"
                      >
                        {applicant.user.name[0]}
                      </Avatar>
                      <div>
                        <Text strong>{applicant.user.name}</Text>
                        <br />
                        <Text type="secondary">
                          {new Date(applicant.createdAt).toLocaleDateString()}
                        </Text>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Tooltip
                        title={
                          applicant.bookmarked
                            ? "Remove from Bookmarks"
                            : "Add to Bookmarks"
                        }
                      >
                        <Button
                          shape="circle"
                          onClick={() => {
                            applicant.bookmarked
                              ? handleUnBookMark(applicant._id)
                              : handleBookMark(applicant._id);
                          }}
                        >
                          <StarOutlined
                            style={{
                              color: applicant.bookmarked ? "gold" : "grey",
                            }}
                          />
                        </Button>
                      </Tooltip>
                      <Tooltip title="View resume">
                        <Button
                          shape="circle"
                          onClick={() => {
                            setProfileId(applicant.user._id);
                            setCurrentApplicantID(applicant._id);
                          }}
                        >
                          <ArrowRightOutlined style={{ color: "#1890ff" }} />
                        </Button>
                      </Tooltip>
                    </div>
                  </div>
                  <Tag
                    color={
                      applicant.status === "Accepted"
                        ? "green"
                        : applicant.status === "Rejected"
                        ? "red"
                        : "blue"
                    }
                    style={{ marginTop: "8px" }}
                  >
                    {applicant.status}
                  </Tag>
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <Text type="secondary">No applicants found</Text>
            </div>
          )}
        </Col>

        {/* Profile Section */}
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={13}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "0",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "600px",
              padding: "0",
              boxSizing: "border-box",
            }}
          >
            {profileId ? (
              <>
                <Profile profileId={profileId} />
                {currentApplicantID && (
                  <div
                    style={{
                      display: "flex",
                      gap: "16px",
                      marginTop: "16px",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Button
                      type="primary"
                      style={{ flex: 1, maxWidth: "200px" }}
                      onClick={() => handleAcceptance(currentApplicantID)}
                    >
                      Accept
                    </Button>
                    <Button
                      type="primary"
                      danger
                      style={{ flex: 1, maxWidth: "200px" }}
                      onClick={() => handleRejection(currentApplicantID)}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <Text type="secondary">
                  Select an applicant to view their profile
                </Text>
              </div>
            )}
          </div>
        </Col>
      </Row>

      {/* Email Modal */}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={Math.min(800, window.innerWidth - 40)}
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <MakeEmail
          applicantId={currentApplicantID}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </div>
  );
};

export default ViewApplicants;