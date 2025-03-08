import { Card, Typography } from 'antd'
import { FolderOpenOutlined, GithubOutlined } from '@ant-design/icons'

const Projects = ({ projects }) => {
  return (
    <>
      <Typography.Title level={3}>Projects</Typography.Title>
      <div
        style={{
          margin: '0 0 0 0',
          padding: '0 20px',
        }}
      >
        {projects.map((project) => (
          <Card
            key={project.title}
            title={project.title}
            extra={
              <div
                className='basicFlexColumn'
                style={{
                  justifyContent: 'flex-start',
                  alignContent: 'flex-start',
                  gap: '2px',
                }}
              >
                <a
                  href={project.deployedLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='basicFlexRow'
                  style={{
                    alignSelf: 'flex-start',
                    marginLeft: '8px',
                  }}
                >
                  <FolderOpenOutlined
                    style={{ marginRight: '8px', color: '#08c' }}
                  />
                  <span>Live</span>
                </a>
                <a
                  href={project.projectLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='basicFlexRow'
                  style={{
                    alignSelf: 'flex-start',
                  }}
                >
                  <GithubOutlined style={{ marginLeft: '8px' }} />
                  <span>View Code</span>
                </a>
              </div>
            }
            style={{ marginBottom: '16px' }}
          >
            <Typography.Paragraph>{project.overview}</Typography.Paragraph>
            {project.description && (
              <Typography.Paragraph>{project.description}</Typography.Paragraph>
            )}
          </Card>
        ))}
      </div>
    </>
  )
}

export default Projects
