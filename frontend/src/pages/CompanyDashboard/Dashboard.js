import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import { Col, Row } from 'antd'

import { lazy, Suspense } from 'react'

import Spinner from '../Spinner'
import UserPage from '../UserPage/UserPage'

const SideBar = lazy(() => import('../../components/SideBar'))
const Header = lazy(() => import('../../components/Header'))

const HomePage = lazy(() =>
  import('../../components/CompanyDashBoard/HomePage/HomePage')
)
const CompanyView = lazy(() => import('../CompanyView/CompanyView.js'))
const JobDetails = lazy(() =>
  import('../../components/CompanyDashBoard/JobDetails/JobDetails')
)
const ViewApplicants = lazy(() =>
  import('../../components/CompanyDashBoard/JobDetails/ViewApplicants')
)
const PostJob = lazy(() => import('../../components/CompanyDashBoard/PostJob'))

const EditJob = lazy(() => import('../../components/CompanyDashBoard/EditJob'))

const CreateTest = lazy(() =>
  import('../../components/CompanyDashBoard/Test/CreateTest')
)
const SetQuestions = lazy(() =>
  import('../../components/CompanyDashBoard/Test/SetQuestions')
)
const CompanyDashBoard = () => {
  return (
    <div>
      <div
        style={{
          marginBottom: '100px',
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
            minHeight: '100vh',
            padding: '0 20px',
          }}
        >
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/:id' element={<CompanyView />} />
              <Route path='/job/:id' element={<JobDetails />} />
              <Route path='/postjob' element={<PostJob />} />
              <Route path='/applicants/:id' element={<ViewApplicants />} />
              <Route path='job/:id/edit' element={<EditJob />} />

              <Route path='/users' element={<UserPage />} />
              {/* <Route path='/createTest' element={<CreateTest />} />
              <Route path='/setTestQuestions' element={<SetQuestions />} /> */}

              <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          </Suspense>
        </Col>
      </Row>
    </div>
  )
}

export default CompanyDashBoard
