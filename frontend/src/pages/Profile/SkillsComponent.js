import { Tag, Typography } from 'antd'

const Skills = ({ skills }) => {
  // Ensure skills is an array; if it's a string, split it
  const skillList = Array.isArray(skills) ? skills : (typeof skills === 'string' ? skills.split(',').map(skill => skill.trim()) : []);

  return (
    <>
      <Typography.Title level={3}>Skills</Typography.Title>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {skillList.map(skill => (
          <Tag
            key={skill}
            color='geekblue'
            style={{
              margin: '4px',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '17px',
            }}
          >
            {skill}
          </Tag>
        ))}
      </div>
    </>
  );
};

export default Skills;
