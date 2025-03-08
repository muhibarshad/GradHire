import { Card, Typography } from 'antd'
import { TrophyOutlined } from '@ant-design/icons'

const Achievements = ({ achievements }) => {
  return (
    <>
      <Typography.Title level={3}>Achievements</Typography.Title>
      <div
        style={{
          width: '100%',
        }}
      >
        {achievements.map((achievement) => (
          <Card
            key={achievement.title}
            title={achievement.title}
            extra={
              <TrophyOutlined
                style={{
                  marginRight: '8px',
                  color: '#ffff00',
                  fontSize: '19px',
                }}
              />
            }
            style={{ marginBottom: '16px' }}
          >
            <Typography.Paragraph>
              {achievement.description}
            </Typography.Paragraph>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Achievements
