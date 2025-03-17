import { Card, Typography, Tag, Divider, Row, Col, Modal } from "antd";
import {
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import styles from "../../../pages/JobDescription/JobDescription.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EditJob from "../EditJob";
const { Title, Text } = Typography;

function JobDescription({ job, setIsChange }) {
  const navigate = useNavigate();
  const formattedDate = new Date(job.datePosted).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [visible, setVisible] = useState(false);

  const editJob = () => {
    setVisible(true);
    setIsChange();
  };

  const handleCancel = () => {
    setVisible(false);
    setIsChange();
  };
  const tags = job.skills.map((skill) => (
    <Tag key={skill} color="blue">
      {skill}
    </Tag>
  ));

  return (
    <div>
      <div>
        <div className={styles.content}>
          <Card style={{ width: "100%", borderRadius: "10px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Title level={3} style={{ fontSize: "1.5rem" }}>
                  {job.title}
                </Title>
                <EditOutlined
                  style={{
                    fontSize: "25px",
                    color: "#1890ff",
                    cursor: "pointer",
                  }}
                  onClick={editJob}
                />
              </div>
            </div>
            <Divider />
            <Row
              gutter={[16, 16]}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Col xs={24} md={16}>
                <Text
                  style={{ fontSize: "18px" }}
                >{`${job.mode} / ${job.type}`}</Text>
                <br />
                <Text style={{ fontSize: "16px" }}>{job.location}</Text>
              </Col>
              <Col xs={24} md={8}>
                <div
                  style={{
                    gap: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <DollarOutlined
                      style={{
                        color: "#52c41a",
                        fontSize: "16px",
                      }}
                      className="iconStyle"
                    />
                    <Text>{job.salaryRange}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <TeamOutlined
                      style={{
                        color: "#1890ff",
                        fontSize: "16px",
                      }}
                    />
                    <Text>{`${job.noOfApplicants} applicants`}</Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <ClockCircleOutlined
                      style={{
                        color: "#faad14",
                        fontSize: "16px",
                      }}
                    />
                    <Text>{formattedDate}</Text>
                  </div>
                </div>
              </Col>
            </Row>
            <Divider />
            <Text>{job.description}</Text>
            <Divider />
            <div>{tags}</div>
            <Divider />
          </Card>
        </div>
      </div>
      <Modal
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        height={800}
      >
        <EditJob job={job} closeHandle={handleCancel} />
      </Modal>
    </div>
  );
}

export default JobDescription;
