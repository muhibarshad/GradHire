import { Timeline, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'

const Education = ({ education }) => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Typography.Title
        level={3}
        style={{
          textAlign: 'center',
        }}
      >
        Education
      </Typography.Title>
      <Timeline
        mode='left'
        style={{
          margin: '0 0 0 0',
          padding: '0 20px',
        }}
      >
        {education.map((edu) => (
          <Timeline.Item>
            <Typography.Title level={5}>{edu.title}</Typography.Title>

            <div
              className='basicFlexRow'
              style={{
                justifyContent: 'space-between',
                alignContent: 'center',
                width: '100%',
                margin: '0 0 0 0',
              }}
            >
              <Typography.Paragraph level={5} style={{ marginBottom: 0 }}>
                {edu.instituteName}
              </Typography.Paragraph>
              <div className='basicFlexRow'>
                <ClockCircleOutlined
                  style={{ fontSize: '16px', color: '#08c' }}
                />{' '}
                <span>
                  {' '}
                  {new Date(edu.startDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}{' '}
                  -{' '}
                  {new Date(edu.endDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                  })}
                </span>
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </div>
  )
}

export default Education
