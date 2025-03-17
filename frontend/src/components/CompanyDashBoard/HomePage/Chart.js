import React from "react";
import { Row, Col, Divider } from "antd";
import Chart from "react-apexcharts";

const ChartComponent = ({ data, jobs }) => {
  const doughnutData = {
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Jobs Posted", "Followers", "Reviews", "Applicants"],
      legend: {
        position: "bottom",
      },
    },
    series: [data.jobs, data.followers, data.reviews, data.applicants],
  };

  const barData = {
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: jobs.map((job) => job.title),
        labels: {
          rotate: -45,
          style: {
            fontSize: "10px",
          },
        },
      },
      yaxis: {
        title: {
          text: "Number of Applicants",
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "90%", // Increase column width
        },
      },
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 600,
          options: {
            chart: {
              height: 300, // Ensure chart is not squeezed
            },
          },
        },
      ],
    },
    series: [
      {
        name: "Applicants",
        data: jobs.map((job) => job.noOfApplicants),
      },
    ],
  };

  return (
    <Row gutter={[16, 16]} justify="center" style={{ width: "100%" }}>
      <Col xs={24} sm={24} md={10}>
        <Chart
          options={doughnutData.options}
          series={doughnutData.series}
          type="donut"
          width="100%"
        />
      </Col>
      <Col xs={0} sm={0} md={2} className="basicFlexRow">
        <Divider
          type="vertical"
          style={{
            backgroundColor: "red",
            height: "100%",
          }}
        />
      </Col>
      <Col xs={24} sm={24} md={10}>
        <Chart
          options={barData.options}
          series={barData.series}
          type="bar"
          width="100%"
          height="300"
        />
      </Col>
    </Row>
  );
};

export default ChartComponent;
