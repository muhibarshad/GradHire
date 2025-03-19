import React from 'react'
import { Typography, Timeline, Row, Col, Tag } from 'antd'
import { ExperimentOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography

const ProfessionalExperience = ({ experience }) => {
  if (!experience || experience.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '1rem' }}>
          <ExperimentOutlined style={{ marginRight: '8px' }} />
          Professional Experience
        </Title>
        <Text type="secondary">No work experience available</Text>
      </div>
    )
  }

  return (
    <div>
      <Title level={4} style={{ color: '#1890ff', marginBottom: '1.5rem', textAlign: 'center' }}>
        <ExperimentOutlined style={{ marginRight: '8px' }} />
        Professional Experience
      </Title>

      <Timeline
        style={{ 
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        {experience.map((exp, index) => (
          <Timeline.Item 
            key={index}
            color="#1890ff"
          >
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Text strong style={{ fontSize: '16px' }}>
                  {exp.title}
                </Text>
              </Col>
              <Col xs={24}>
                <Text style={{ color: '#1890ff' }}>
                  {exp.company}
                </Text>
              </Col>
              <Col xs={24}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </Text>
                  </Col>
                  {exp.location && (
                    <Col>
                      <Text type="secondary">
                        {exp.location}
                      </Text>
                    </Col>
                  )}
                </Row>
              </Col>
              {exp.description && (
                <Col xs={24}>
                  <Paragraph type="secondary" style={{ fontSize: '14px', marginBottom: '8px' }}>
                    {exp.description}
                  </Paragraph>
                </Col>
              )}
              {exp.technologies && exp.technologies.length > 0 && (
                <Col xs={24}>
                  <Row gutter={[8, 8]}>
                    {exp.technologies.map((tech, techIndex) => (
                      <Col key={techIndex}>
                        <Tag color="blue">{tech}</Tag>
                      </Col>
                    ))}
                  </Row>
                </Col>
              )}
            </Row>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default ProfessionalExperience