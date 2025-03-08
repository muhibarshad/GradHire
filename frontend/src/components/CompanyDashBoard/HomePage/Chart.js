import React from 'react'
import { Row, Col, Divider } from 'antd'
import Chart from 'react-apexcharts'
const ChartComponent = ({ data, jobs }) => {
  console.log(data, jobs)
  const doughnutData = {
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Jobs Posted', 'Followers', 'Reviews', 'Applicants'],
    },

    series: [data.jobs, data.followers, data.reviews, data.applicants],
  }

  const barData = {
    options: {
      chart: {
        type: 'bar',
      },
      xaxis: {
        // Specify the job titles here
        categories: jobs.map((job) => job.title),
      },
      yaxis: {
        title: {
          text: 'Number of Applicants',
        },
      },
    },
    series: [
      {
        name: 'Applicants',
        // Specify the number of applicants here
        data: jobs.map((job) => job.noOfApplicants),
      },
    ],
    colors: ['#FF6384', '#36A2EB'],
  }

  return (
    <Row
      style={{
        display: 'flex',
      }}
    >
      <Col lg={11} md={24} sm={24}>
        <Chart
          options={doughnutData.options}
          series={doughnutData.series}
          type='donut'
          width='500'
        />
      </Col>
      <Col lg={2} md={0} sm={0} className='basicFlexRow'>
        <Divider
          type='vertical'
          style={{
            backgroundColor: 'red',
            height: '100%',
          }}
        />
      </Col>

      <Col lg={11} md={24} sm={24}>
        <Chart
          options={barData.options}
          series={barData.series}
          type='bar'
          width='500'
        />
      </Col>
    </Row>
  )
}

export default ChartComponent
