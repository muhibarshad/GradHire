import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Col, Row } from "antd";

import { lazy, Suspense } from "react";

import Spinner from "../Spinner";

const GiveReview = lazy(() =>
  import("../../components/UserDashBoard/GiveReview")
);
const CompanyList = lazy(() =>
  import("../../components/UserDashBoard/CompaniesPage")
);
const CompanyComparisonPage = lazy(() =>
  import("../../components/UserDashBoard/CompareCompanies")
);
const SideBar = lazy(() => import("../../components/SideBar"));
const Header = lazy(() => import("../../components/Header"));
const UserPage = lazy(() => import("../UserPage/UserPage"));
const JobsList = lazy(() => import("../JobsPage/JobPage"));
const JobDescription = lazy(() => import("../JobDescription/JobDescription"));
const Profile = lazy(() => import("../Profile/Profile"));
const CompanyView = lazy(() => import("../CompanyView/CompanyView"));
const Registration = lazy(() => import("../Registration/Registration"));
const Chat = lazy(() => import("../Chat/Chat"));

const HomePage = lazy(() => import("../../components/UserDashBoard/HomePage"));
const RegisterCompany = lazy(() =>
  import("../../pages/RegisterCompany/RegisterCompany")
);
const ViewApplicants = lazy(() =>
  import("../../components/CompanyDashBoard/JobDetails/ViewApplicants")
);

const DashBoard = () => {
  return (
    <div>
      <div
        style={{
          marginBottom: "100px",
        }}
      >
        <Header />
      </div>
      <SideBar />
      <Row gutter={[16, 16]}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          xl={24}
          style={{
            minHeight: "100vh",
            padding: "0 20px",
          }}
        >
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/review" element={<GiveReview />} />
              <Route path="/companies" element={<CompanyList />} />
              <Route path="/jobs" element={<JobsList />} />
              <Route path="/compare" element={<CompanyComparisonPage />} />
              <Route path="/users" element={<UserPage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/company/:id" element={<CompanyView />} />

              <Route path="/job/:id" exact element={<JobDescription />} />

              <Route path="/uploadResume" element={<Registration />} />
              <Route path="/registerCompany" element={<RegisterCompany />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Suspense>
        </Col>
      </Row>
    </div>
  );
};

export default DashBoard;
