import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Select,
  Typography,
  Card,
  Divider,
  Image,
  message,
} from 'antd';
import styles from './DashBoard.module.css';
import {
  HeartFilled,
  EyeFilled,
  EnvironmentFilled,
  StarFilled,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  BankOutlined,
} from '@ant-design/icons';
import { getAllCompanies } from '../../util/api-call';
import Spinner from '../../pages/Spinner';

const { Option } = Select;

const CompanyBanner = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        width: '100%',
        borderRadius: 5,
        backgroundColor: '#f2f2f2',
        padding: '50px 20px',
      }}
    >
      <Typography.Title level={3} style={{ marginBottom: '30px' }}>
        Compare Two Companies
      </Typography.Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <HeartFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#FF0000',
              }}
            />
            <Typography.Title level={5}>Values & Work Culture</Typography.Title>
            <Typography.Paragraph>
              Compare the values and work culture of different companies
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <EyeFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#52c41a',
              }}
            />
            <Typography.Title level={5}>Reviews & Ratings</Typography.Title>
            <Typography.Paragraph>
              Compare the reviews and ratings of different companies
            </Typography.Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <EnvironmentFilled
              style={{
                fontSize: '32px',
                marginBottom: '10px',
                color: '#1890ff',
              }}
            />
            <Typography.Title level={5}>Location & Industry</Typography.Title>
            <Typography.Paragraph>
              Compare the locations and industries of different companies
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const CompanyRow = ({ fieldIcon, fieldName, fieldValue }) => {
  return (
    <Row
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px', // Adjust padding for mobile
      }}
    >
      <Col>
        <Typography style={{ fontSize: '18px' }} className='basicFlexRow'>
          <p style={{ marginTop: '-8px' }}>
            {fieldIcon} {'  '}
          </p>
          <p>{fieldName}</p>
        </Typography>
      </Col>
      <Col>
        <Typography style={{ fontSize: '18px' }} className='basicFlexRow'>
          <p>{fieldValue}</p>
        </Typography>
      </Col>
    </Row>
  );
};

const CompanyComparisonPage = () => {
  const [companies, setCompanies] = useState([]);
  const [firstCompany, setFirstCompany] = useState(null);
  const [secondCompany, setSecondCompany] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const handleFirstCompanyChange = (value) => {
    setFirstCompany(companies.find((c) => c._id === value));
  };

  const handleSecondCompanyChange = (value) => {
    setSecondCompany(companies.find((c) => c._id === value));
  };

  const compareCompanies = () => {
    if (!firstCompany || !secondCompany) {
      messageApi.error('Please select two companies to compare');
    }
  };

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getAllCompanies();
        setCompanies(response.data.company);
      } catch (error) {
        messageApi.error('Error in Loading Companies');
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px', // Adjust padding for mobile
      }}
    >
      {contextHolder}
      <CompanyBanner />
      <Divider />
      {companies.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Row className={styles.compareContainer} gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Select
                showSearch
                style={{ width: '100%' }} // Full width for mobile
                placeholder='Select a company'
                optionFilterProp='children'
                onChange={handleFirstCompanyChange}
              >
                {companies.map((c) => (
                  <Option key={c.id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12}>
              <Select
                showSearch
                style={{ width: '100%' }} // Full width for mobile
                placeholder='Select a company'
                optionFilterProp='children'
                onChange={handleSecondCompanyChange}
              >
                {companies.map((c) => (
                  <Option key={c.id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row
            span={24}
            style={{
              marginTop: '30px',
              marginBottom: '30px',
            }}
          >
            {firstCompany && (
              <Col
                lg={12}
                md={24}
                sm={24}
                xs={24}
                style={{
                  textAlign: 'center',
                  borderRight: '2px solid #e8e8e8',
                  height: '100%',
                }}
              >
                <Typography.Title level={3}>
                  {firstCompany.name}
                </Typography.Title>
                <Image
                  src={`data:image/jpeg;base64,${firstCompany.photo}`}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                  }}
                />
                <Divider />
                <CompanyRow
                  fieldIcon={
                    <EnvironmentFilled
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldName={'Location'}
                  fieldValue={firstCompany.address}
                />
                <CompanyRow
                  fieldName={'CEO'}
                  fieldIcon={
                    <UserOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={firstCompany.headName}
                />
                <CompanyRow
                  fieldName={'Size'}
                  fieldIcon={
                    <TeamOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={firstCompany.size}
                />
                <CompanyRow
                  fieldName={'Since'}
                  fieldIcon={
                    <CalendarOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={firstCompany.establishedSince}
                />
                <CompanyRow
                  fieldName={'Type'}
                  fieldIcon={
                    <BankOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={firstCompany.type}
                />
                <CompanyRow
                  fieldName={'Rating'}
                  fieldIcon={
                    <StarFilled style={{ fontSize: '16px', color: 'yellow' }} />
                  }
                  fieldValue={'4.5'}
                />
                <Divider />
              </Col>
            )}

            {secondCompany && (
              <Col
                lg={12}
                md={24}
                sm={24}
                xs={24}
                style={{
                  textAlign: 'center',
                }}
              >
                <Typography.Title level={3}>
                  {secondCompany.name}
                </Typography.Title>
                <Image
                  src={`data:image/jpeg;base64,${secondCompany.photo}`}
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                  }}
                />
                <Divider />
                <CompanyRow
                  fieldIcon={
                    <EnvironmentFilled
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldName={'Location'}
                  fieldValue={secondCompany.address}
                />
                <CompanyRow
                  fieldName={'CEO'}
                  fieldIcon={
                    <UserOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={secondCompany.headName}
                />
                <CompanyRow
                  fieldName={'Size'}
                  fieldIcon={
                    <TeamOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={secondCompany.size}
                />
                <CompanyRow
                  fieldName={'Since'}
                  fieldIcon={
                    <CalendarOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={secondCompany.establishedSince}
                />
                <CompanyRow
                  fieldName={'Type'}
                  fieldIcon={
                    <BankOutlined
                      style={{ fontSize: '16px', color: '#1890ff' }}
                    />
                  }
                  fieldValue={secondCompany.type}
                />
                <CompanyRow
                  fieldName={'Rating'}
                  fieldIcon={
                    <StarFilled style={{ fontSize: '16px', color: 'yellow' }} />
                  }
                  fieldValue={'4.5'}
                />
                <Divider />
              </Col>
            )}
          </Row>
        </>
      )}
    </div>
  );
};

export default CompanyComparisonPage;