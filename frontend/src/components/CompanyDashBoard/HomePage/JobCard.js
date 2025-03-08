import React, { useState } from 'react'
import { List, Typography, Avatar, Tag, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const JobCard = ({ jobs }) => {
  const navigate = useNavigate()

  return (
    <>
      <List
        style={{
          width: '100%',
          fontSize: '18px',
          minHeight: '300px !important',
        }}
        dataSource={jobs}
        renderItem={(item) => (
          <List.Item
            style={{
              width: '100%',
              padding: '40px',
              marginBottom: '20px',

              boxShadow: '0 0 15px rgba(0,0,0,0.1)',
            }}
            onClick={() => {
              navigate(`job/${item._id}`)
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: '#1890ff' }}>
                  {item.title[0]}
                </Avatar>
              }
              title={<a href='/'>{item.title}</a>}
              description={
                <div className='basicFlexRow'>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      gap: '5px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div>{item.dateApplied}</div>
                    </div>
                    <div>{item.location}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Tag color='blue'>{item.noOfApplicants}</Tag>
                      <span>{'  '} Applicants </span>
                    </div>
                  </div>

                  <div
                    className='basicFlexColumn'
                    style={{
                      gap: '10px',
                    }}
                  >
                    <Tag color='orange'>{item.noOfClicks} Views</Tag>

                    <Button
                      type='primary'
                      onClick={() => {
                        navigate(`job/${item._id}`)
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default JobCard
