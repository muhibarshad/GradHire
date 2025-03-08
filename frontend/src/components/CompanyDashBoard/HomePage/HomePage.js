import React, { useEffect, useState } from 'react'
import { Divider, Typography, Button, message } from 'antd'
import Spinner from '../../../pages/Spinner'
import JobCard from './JobCard'
import ChartComponent from './Chart'
import { useSelector, useDispatch } from 'react-redux'

import {
  deleteCompany,
  removeCompany,
  getCompany,
} from '../../../util/api-call'
import { switchRole, updateUser, setCopmany } from '../../../redux/user'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const user = useSelector((state) => state.user)
  const [company, setCompany] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [jobs, setJobs] = useState([])
  const [chartData, setChartData] = useState({
    jobs: 0,
    reviews: 0,
    applicants: 0,
    clicks: 0,
    followers: 0,
  })

  // get company
  useEffect(() => {
    const getCompanyData = async () => {
      try {
        const res = await getCompany(user.companyID)
        ////console.log(res)
        if (res.status === 'success') {
          const mcompany = res.data
          setJobs(res.data.jobs)
          dispatch(
            setCopmany({
              company: res.data,
            })
          )

          // calculate chart data
          let jobs = mcompany.jobs.length
          let reviews = mcompany.reviews.length
          let applicants = 0
          let followers = mcompany.followers.length
          let clicks = mcompany.jobs.reduce((acc, job) => {
            return acc + job.noOfClicks
          }, 0)

          mcompany.jobs.forEach((job) => {
            applicants += 2
          })

          setChartData({
            jobs,
            reviews,
            applicants,
            clicks,
            followers,
          })
          //console.log(chartData)

          setCompany(res.data)
        } else {
          message.error(res.message)
        }
      } catch (err) {
        //console.log(err)
      }
    }

    getCompanyData()
  }, [])

  const handleDeleteCompany = async () => {
    setLoading(true)

    try {
      const res = await deleteCompany(user.companyID)

      const res2 = await removeCompany(user.id, user.companyID)
      //console.log(res2)
      if (res2.status === 'success') {
        //console.log(res2)
        dispatch(
          switchRole({
            role: 'user',
            companyID: null,
          })
        )

        dispatch(
          updateUser({
            user: res2.data.user,
          })
        )
        setLoading(false)
        navigate('/user/dashboard')
      } else {
        message.error(res2.message)
        setLoading(false)
        navigate('/user/dashboard')
      }
    } catch (err) {
      setLoading(false)
      //console.log(err)
    }
  }

  if (company === null) {
    return <Spinner />
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px 60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title level={3}>
          Here are your stats {company.name}
        </Typography.Title>
        <div>
          <Button
            type='primary'
            style={{ marginLeft: 'auto' }}
            onClick={() => {
              navigate(`/company/${company._id}`)
            }}
          >
            View Details
          </Button>
          <Button
            type='primary'
            style={{ marginLeft: 'auto', marginLeft: '10px' }}
            onClick={() => {
              navigate('postjob')
            }}
          >
            Post a Job
          </Button>

          <Button
            type='primary'
            style={{ marginLeft: '10px', backgroundColor: 'red' }}
            loading={loading}
            onClick={handleDeleteCompany}
          >
            Delete Company
          </Button>
        </div>
      </div>

      <Divider />
      <ChartComponent data={chartData} jobs={jobs} />
      <Divider />

      <Typography.Title level={3}>Job You have Posted</Typography.Title>
      {/* <JobList /> */}
      <JobCard jobs={jobs} />
    </div>
  )
}

export default HomePage
