import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

import { Col, Row, Button, Divider, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

  
import { getJob, getApplicationByJob } from "../../../util/api-call";
import Spinner from "../../../pages/Spinner";

const JobDetails = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const { id } = useParams();
  const [isChange, setIsChange] = useState(false);
  const [haveApplicant,setHaveApplicants]=useState(false);

  const [job, setJob] = useState(null);
  //console.log(isChange, id)

  const handleChange = () => {
    setIsChange(!isChange);
  };

  // get job
  useEffect(() => {
    const getJobData = async () => {
      try {
        const res = await getJob(id);
        const res1 = await getApplicationByJob(id);
        setHaveApplicants(res1.data.data.length)

        console.log(res1.data.data.length);
        if (res.status === "success") {
          console.log(res);
          setJob(res.data);
        } else {
          message.error(res.message);
        }
      } catch (err) {
        message.error("Error fetching job details");
      }
    };

    getJobData();
  }, [isChange, id]);

  if (!job) {
    return <Spinner />;
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        "@media (min-width: 576px)": {
          padding: "20px 60px",
        },
      }}
    >
      <JobCard job={job} setIsChange={handleChange} />

      <Button
        type="primary"
        onClick={() => {
          localStorage.setItem("currentJob", job._id);
          navigate(`/company/applicants/${id}`);
        }}
        disabled={haveApplicant === 0}
        style={{
          margin: "20px 0 0 0",
          padding: "0 20px",
          width: "100%",
        }}
      >
         View Applicants
      </Button>
    </div>
  );
};

export default JobDetails;
