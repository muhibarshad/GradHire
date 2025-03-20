import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Card,
  Typography,
  Tag,
  Button,
  Tooltip,
  Divider,
  Row,
  message,
  Col,
  Modal,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  TeamOutlined,
  DollarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

import styles from "./JobDescription.module.css";

import { useEffect } from "react";
import {
  addFavourite,
  applyJob,
  clickJob,
  getApplication,
  getJob,
  postApplication,
  removeFavourite,
} from "../../util/api-call";
import Spinner from "../Spinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/user";

const { Title, Text } = Typography;

function JobDescription() {
  const [job, setJob] = useState(null);
  const [modal2Open, setModal2Open] = useState(false);
  const user = useSelector((state) => state.user);

  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();

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
  }, [id]);

  useEffect(() => {
    const fetchJob = async () => {
      // Fetch job details using ID from location state or params
      try {
        const res = await getJob(id);
        setJob(res.data);
        //console.log(res.data)
      } catch (err) {
        //console.log(err)
      }
    };

    const clickAdd = async () => {
      try {
        const res = await clickJob(id);
        //console.log(res)
      } catch (err) {
        //console.log(err)
      }
    };

    fetchJob();
    clickAdd();
  }, [id]);

  // Add to favorites
  const handleAddFavoriteClick = async () => {
    try {
      // check if already added to favorites
      if (user.user.favouriteJobs.includes(job._id)) {
        messageApi.error("Already added to favorites");
        return;
      }
      const res = await addFavourite(user.id, job._id);
      if (res.status === "success") {
        dispatch(
          updateUser({
            user: res.data.user,
          })
        );

        messageApi.success("Job added to favorites");
      } else messageApi.error("Error ");
    } catch (err) {
      //console.log(err)
      messageApi.error("Already Added to favorites");
    }
  };

  // Remove from favorites
  const handleRemoveFavoriteClick = async () => {
    try {
      // check if already added to favorites
      if (!user.user.favouriteJobs.includes(job._id)) {
        messageApi.error("Not in favorites");
        return;
      }

      const res = await removeFavourite(user.id, job._id);
      if (res.status === "success") {
        dispatch(
          updateUser({
            user: res.data.user,
          })
        );
        messageApi.success("Job removed from favorites");
      } else messageApi.success("Error");
    } catch (err) {
      //console.log(err)
      messageApi.error("Error removing from favorites");
    }
  };

  const handleApplyClick = async () => {
    console.log("Resume Data: ", user.user.resume);
    // console.log("Other Resume Data: ", user.user.resume.CV.other);
    // console.log("Other Resume Data: ", user.user.resume.CV.other.skills);


    if (
      !user.user.resume ||
      !user.user.resume.CV.other ||
      !user.user.resume.CV.other.skills
    ) {
      messageApi.error("Please upload your resume with valid skills");
      return;
    }

    // Extract skills from user resume (convert to array)
    const userSkills = user.user.resume.CV.other.skills
      .split(",") // <-- Change space to comma if skills are stored as "React, Node, HTML"
      .map((skill) => skill.trim().toLowerCase());

    // Convert job skills to lowercase for comparison
    const jobSkills = (job.skills || []).map((skill) => skill.toLowerCase());

    // Find the common skills
    const commonSkills = userSkills.filter((skill) =>
      jobSkills.includes(skill)
    );

    // Avoid division by zero
    if (jobSkills.length === 0) {
      messageApi.error("Job has no skills listed.");
      return;
    }

    // Calculate matching percentage
    const matchPercentage = (commonSkills.length / jobSkills.length) * 100;

    // Check if user meets the 50% threshold
    if (matchPercentage < 50) {
      messageApi.error(
        `Your skills match only ${matchPercentage.toFixed(
          2
        )}% of the job requirements. Application discarded.`
      );
      return;
    }

    try {
      setLoading(true);
      const data = { job: job._id, user: user.id };

      // Post the application
      const res = await postApplication(data);

      if (res.status === "success") {
        await applyJob(job._id);
        messageApi.success("You have applied to this job successfully!");

        setTimeout(() => setLoading(false), 1000);
        setTimeout(() => setApplications([...applications, res.data]), 1000);
      } else {
        messageApi.error("Error applying to job");
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      messageApi.error("Error applying to job");
    }
  };

  if (!job || loading || !user) return <Spinner />;

  const formattedDate = new Date(job.datePosted).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tags = job.skills.map((skill) => (
    <Tag key={skill} color="blue">
      {skill}
    </Tag>
  ));

  const favoriteIconAdd = (
    <HeartOutlined style={{ color: "#ff4d4f", fontSize: "30px" }} />
  );
  const favoriteIconRemove = (
    <HeartFilled style={{ color: "#ff4d4f", fontSize: "30px" }} />
  );

  console.log(applications);
  const hasApplied = applications.some(
    (application) => application.job._id === job._id
  );

  return (
    <>
      {contextHolder}
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <Card style={{ width: "100%", borderRadius: "10px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <Title level={2}>{job.title}</Title>
                  <Typography.Paragraph level={2}>
                    {job.company.name}
                  </Typography.Paragraph>
                </div>
                <Tooltip
                  onClick={() => {
                    if (user) {
                      if (user.user.favouriteJobs.includes(job._id)) {
                        handleRemoveFavoriteClick();
                      } else {
                        handleAddFavoriteClick();
                      }
                    }
                  }}
                  title={
                    user.user.favouriteJobs.includes(job._id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {user.user.favouriteJobs.includes(job._id)
                    ? favoriteIconRemove
                    : favoriteIconAdd}
                </Tooltip>
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
                        class="iconStyle"
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
              <div style={{ textAlign: "center" }}>
                {hasApplied ? (
                  <Button
                    style={{ width: "100%", marginBottom: "10px" }}
                    type="primary"
                    size="large"
                    disabled
                  >
                    Already Applied
                  </Button>
                ) : (
                  <Button
                    style={{ width: "100%", marginBottom: "10px" }}
                    type="primary"
                    size="large"
                    onClick={handleApplyClick} // replace handleApply with the actual apply logic
                  >
                    Apply
                  </Button>
                )}

                <Text type="primary">
                  By clicking the apply button, you agree to the{" "}
                  <Link onClick={() => setModal2Open(true)}>
                    Terms & Conditions
                  </Link>{" "}
                  of our website.
                </Text>
                <Modal
                  title="Terms & Conditions"
                  centered
                  open={modal2Open}
                  onOk={() => setModal2Open(false)}
                  onCancel={() => setModal2Open(false)}
                >
                  <p>
                    By applying to this job, you agree to the following terms
                    and conditions:
                  </p>
                  <ol>
                    <li>
                      You certify that the information you provide on your
                      application is true and complete to the best of your
                      knowledge.
                    </li>
                    <li>
                      You authorize the employer to investigate any information
                      contained in your application or resume.
                    </li>
                    <li>
                      You understand that any misrepresentation or omission of
                      facts in your application or during the hiring process may
                      result in disqualification from employment or termination
                      if already employed.
                    </li>
                    <li>
                      You authorize the employer to obtain and verify any and
                      all information regarding your previous employment,
                      education, and criminal history.
                    </li>
                    <li>
                      You understand that any employment offer is contingent
                      upon successful completion of a background check.
                    </li>
                    <li>
                      You understand that employment with this company is
                      at-will, meaning that either you or the employer may
                      terminate the employment relationship at any time and for
                      any reason.
                    </li>
                    <li>
                      You agree to comply with all company policies, procedures,
                      and rules.
                    </li>
                    <li>
                      You understand that this job posting does not guarantee
                      employment or an offer of employment.
                    </li>
                  </ol>
                </Modal>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default JobDescription;
