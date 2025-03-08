import { Timeline, Typography } from 'antd'
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'

const ProfessionalExperience = ({ experience }) => {
  return (
    <>
      <Typography.Title level={3}>Professional Experience</Typography.Title>
      <Timeline
        mode='left'
        style={{
          margin: '0 0 0 0',
          padding: '0 20px',
        }}
      >
        {experience.map((exp) => (
          <Timeline.Item key={exp.title}>
            <Typography.Title level={5}>{exp.title}</Typography.Title>
            <div
              className='basicFlexRow'
              style={{ justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography.Paragraph strong>
                {exp.companyName}
              </Typography.Paragraph>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <ClockCircleOutlined
                  style={{ marginRight: '8px', color: '#08c' }}
                />
                <Typography.Text>
                  {new Date(exp.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}{' '}
                  -{' '}
                  {new Date(exp.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </Typography.Text>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '-5px',
                marginBottom: '10px',
              }}
            >
              <EnvironmentOutlined
                style={{ marginRight: '8px', color: '#08c' }}
              />
              <Typography.Text>{exp.location}</Typography.Text>
            </div>
            <Typography.Paragraph>{exp.description}</Typography.Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  )
}

export default ProfessionalExperience
