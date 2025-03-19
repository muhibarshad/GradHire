import React from 'react'
import { Typography, Row, Col, Tag } from 'antd'
import { ToolOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Skills = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Title level={4} style={{ color: '#1890ff', marginBottom: '1rem' }}>
          <ToolOutlined style={{ marginRight: '8px' }} />
          Skills
        </Title>
        <Text type="secondary">No skills listed</Text>
      </div>
    )
  }

  return (
    <div>
      <Title level={4} style={{ color: '#1890ff', marginBottom: '1.5rem', textAlign: 'center' }}>
        <ToolOutlined style={{ marginRight: '8px' }} />
        Skills
      </Title>

      <Row gutter={[12, 12]} justify="center">
        {skills.map((skill, index) => (
          <Col key={index}>
            <Tag 
              color="blue"
              style={{ 
                padding: '4px 12px',
                fontSize: '14px'
              }}
            >
              {skill}
            </Tag>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Skills