import React, { useEffect, useState } from 'react'
import JobCard from './JobCard'

import { Col, Row, Button, Divider, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getJob } from '../../../util/api-call'
import Spinner from '../../../pages/Spinner'

const JobDetails = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)

  const { id } = useParams()
  const [isChange, setIsChange] = useState(false)

  const [job, setJob] = useState(null)
  //console.log(isChange, id)

  const handleChange = () => {
    setIsChange(!isChange)
  }

  // get job
  useEffect(() => {
    const getJobData = async () => {
      try {
        const res = await getJob(id)
        //console.log(res)
        if (res.status === 'success') {
          setJob(res.data)
        } else {
          message.error(res.message)
        }
      } catch (err) {
        //console.log(err)
      }
    }

    getJobData()
  }, [isChange, id])

  if (!job) {
    return <Spinner />
  }
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px 60px',
      }}
    >
      <JobCard job={job} setIsChange={handleChange} />

      <Button
        type='primary'
        onClick={() => {
          // set job id in local storage
          localStorage.setItem('currentJob', job._id)
          navigate(`/company/applicants/${id}`)
        }}
        style={{
          margin: '20px 0 0 0',
          padding: '0 20px',
          width: '100%',
        }}
      >
        View Applicants
      </Button>
    </div>
  )
}

export default JobDetails
