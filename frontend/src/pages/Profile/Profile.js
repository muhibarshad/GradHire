import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Col, Row, Divider, Button, Avatar, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MessageOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Education from "./EducationComponent";
import Spinner from "../Spinner";
import { getUser } from "../../util/api-call";
import { useSelector } from "react-redux";
import ProfessionalExperience from "./WorkExperienceComponent";
import Projects from "./ProjectsComponent";
import Achievements from "./AchievementComponent";
import Skills from "./SkillsComponent";
import { useParams } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

const Profile = ({ profileId }) => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  let id = profileId ? profileId : params.id;
  const [currentUserId, setCurrentUserId] = useState(false);

  useEffect(() => {
    getUser(id)
      .then((res) => {
        if (res.data._id === user.id) setCurrentUserId(true);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  const BasicInfo = () => {
    return (
      <Card
        style={{
          width: "100%",
          marginBottom: "2rem",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <Row gutter={[24, 24]} justify="center" align="middle">
          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div
              style={{
                textAlign: "center",
                padding: "1rem",
              }}
            >
              <Avatar
                src={
                  profile?.photo
                    ? `data:image/jpeg;base64, ${profile.photo}`
                    : undefined
                }
                size={{ xs: 100, sm: 120, md: 140, lg: 150, xl: 150 }}
                icon={<UserOutlined />}
                style={{
                  marginBottom: "1rem",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Title
                level={3}
                style={{
                  margin: 0,
                  marginTop: "0.5rem",
                  wordBreak: "break-word",
                  whiteSpace: "normal",
                  fontSize: "clamp(20px, 2.5vw, 24px)",
                }}
              >
                {profile.name}
              </Title>
            </div>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16}>
            <div style={{ padding: "1rem" }}>
              <Row gutter={[16, 16]} style={{ marginBottom: "1.5rem" }}>
                {profile.address && (
                  <Col xs={24}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        wordBreak: "break-word",
                      }}
                    >
                      <EnvironmentOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                      <Text style={{ fontSize: "16px" }}>
                        {profile.address}
                      </Text>
                    </div>
                  </Col>
                )}

                <Col xs={24} sm={12}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      wordBreak: "break-word",
                    }}
                  >
                    <MailOutlined
                      style={{ fontSize: "20px", color: "#1890ff" }}
                    />
                    <Text
                      style={{ fontSize: "16px", overflowWrap: "anywhere" }}
                    >
                      {profile.email}
                    </Text>
                  </div>
                </Col>

                {profile.phoneNo && (
                  <Col xs={24} sm={12}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        wordBreak: "break-word",
                      }}
                    >
                      <PhoneOutlined
                        style={{ fontSize: "20px", color: "#1890ff" }}
                      />
                      <Text style={{ fontSize: "16px" }}>
                        {profile.phoneNo}
                      </Text>
                    </div>
                  </Col>
                )}
              </Row>

              {!currentUserId && (
                <Row>
                  <Col xs={24}>
                    <Button
                      type="primary"
                      icon={<MessageOutlined />}
                      onClick={() => navigate("/user/chat")}
                      size="large"
                      style={{ width: "100%" }}
                    >
                      Message
                    </Button>
                  </Col>
                </Row>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    );
  };

  if (loading) return <Spinner />;

  return (
    <div
      style={{
        padding: "1rem",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <BasicInfo />

      {profile.resume === null ? (
        <Card
          style={{ textAlign: "center", marginBottom: "2rem", padding: "1rem" }}
        >
          <Title level={4}>No Resume Uploaded</Title>
          {currentUserId && (
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => navigate("/user/uploadResume")}
              style={{ marginTop: "1rem" }}
            >
              Upload Resume
            </Button>
          )}
        </Card>
      ) : (
        <div>
          <Card
            style={{
              marginBottom: "2rem",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "1rem",
            }}
          >
            <Title
              level={3}
              style={{
                color: "#1890ff",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {profile.resume.title}
            </Title>
            <Paragraph style={{ textAlign: "center", wordBreak: "break-word" }}>
              {profile.resume.summary}
            </Paragraph>
          </Card>

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card
                style={{
                  height: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "1rem",
                }}
              >
                <Education education={profile.resume.CV.education} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                style={{
                  height: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "1rem",
                }}
              >
                <ProfessionalExperience
                  experience={profile.resume.CV.workExp}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                style={{
                  height: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "1rem",
                }}
              >
                <Projects projects={profile.resume.CV.project} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card
                style={{
                  height: "100%",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "1rem",
                }}
              >
                <Achievements achievements={profile.resume.CV.achievement} />
              </Card>
            </Col>
            <Col xs={24}>
              <Card
                style={{
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  padding: "1rem",
                }}
              >
                <Skills skills={profile?.resume?.CV?.other?.skills || []} />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Profile;
