import React, { useEffect, useState } from "react";
import { Divider, Typography, Button, message } from "antd";
import Spinner from "../../../pages/Spinner";
import JobCard from "./JobCard";
import ChartComponent from "./Chart";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCompany,
  removeCompany,
  getCompany,
} from "../../../util/api-call";
import { switchRole, updateUser, setCopmany } from "../../../redux/user";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const [company, setCompany] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [chartData, setChartData] = useState({
    jobs: 0,
    reviews: 0,
    applicants: 0,
    clicks: 0,
    followers: 0,
  });

  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await getCompany(user.companyID);
        if (res.status === "success") {
          const mcompany = res.data;
          setJobs(res.data.jobs);
          dispatch(setCopmany({ company: res.data }));

          let jobs = mcompany.jobs.length;
          let reviews = mcompany.reviews.length;
          let applicants = mcompany.jobs.reduce((acc) => acc + 2, 0);
          let followers = mcompany.followers.length;
          let clicks = mcompany.jobs.reduce(
            (acc, job) => acc + job.noOfClicks,
            0
          );

          setChartData({ jobs, reviews, applicants, clicks, followers });
          setCompany(res.data);
        } else {
          message.error(res.message);
        }
      } catch (err) {}
    };

    getCompanyData();
  }, []);

  const handleDeleteCompany = async () => {
    setLoading(true);
    try {
      await deleteCompany(user.companyID);
      const res2 = await removeCompany(user.id, user.companyID);
      if (res2.status === "success") {
        dispatch(switchRole({ role: "user", companyID: null }));
        dispatch(updateUser({ user: res2.data.user }));
        setLoading(false);
        navigate("/user/dashboard");
      } else {
        message.error(res2.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  if (company === null) {
    return <Spinner />;
  }

  return (
    <div style={{ minHeight: "100vh", padding: "20px" }}>
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Here are your stats {company.name}
      </Typography.Title>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => navigate(`/company/${company._id}`)}
        >
          View Details
        </Button>
        <Button type="primary" onClick={() => navigate("postjob")}>
          Post a Job
        </Button>
        <Button
          type="primary"
          danger
          loading={loading}
          onClick={handleDeleteCompany}
        >
          Delete Company
        </Button>
      </div>
      <Divider />
      <ChartComponent data={chartData} jobs={jobs} />
      <Divider />
      <Typography.Title level={3} style={{ textAlign: "center" }}>
        Jobs You Have Posted
      </Typography.Title>
      <JobCard jobs={jobs} />
    </div>
  );
};

export default HomePage;
