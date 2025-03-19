import React from 'react'
import { Typography, Timeline, Row, Col } from 'antd'
import { BookOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Education = ({ education }) => {
  if (!education || education.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '1rem' }}>
          <BookOutlined style={{ marginRight: '8px' }} />
          Education
        </Title>
        <Text type="secondary">No education details available</Text>
      </div>
    )
  }

  return (
    <div>
      <Title level={4} style={{ color: '#1890ff', marginBottom: '1.5rem', textAlign: 'center' }}>
        <BookOutlined style={{ marginRight: '8px' }} />
        Education
      </Title>
      
      <Timeline
        style={{ 
          maxWidth: '100%',
          margin: '0 auto'
        }}
      >
        {education.map((edu, index) => (
          <Timeline.Item 
            key={index}
            color="#1890ff"
          >
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Text strong style={{ fontSize: '16px' }}>
                  {edu.degree}
                </Text>
              </Col>
              <Col xs={24}>
                <Text style={{ color: '#1890ff' }}>
                  {edu.institution}
                </Text>
              </Col>
              <Col xs={24}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </Text>
                  </Col>
                  {edu.grade && (
                    <Col>
                      <Text type="secondary">
                        Grade: {edu.grade}
                      </Text>
                    </Col>
                  )}
                </Row>
              </Col>
              {edu.description && (
                <Col xs={24}>
                  <Text type="secondary" style={{ fontSize: '14px' }}>
                    {edu.description}
                  </Text>
                </Col>
              )}
            </Row>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default Education