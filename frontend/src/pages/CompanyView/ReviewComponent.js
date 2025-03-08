import { Row, Col, Typography, Button, Rate } from 'antd'
import {
  LikeOutlined,
  DislikeOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { upvoteReview, downvoteReview } from '../../util/api-call'
import { useSelector } from 'react-redux'

const ReviewComponent = (props) => {
  const [review, setReview] = useState(props.review)

  const date = new Date(review.createdAt)

  const userId = useSelector((state) => state.user.id)
  //console.log(userId)
  const handleUpvote = async () => {
    // check if the user has already upvoted
    if (review.upvotes.includes(userId)) {
      //console.log('Already upvoted')
      return
    }
    //console.log('Upvote')

    const data = {
      id: userId,
    }

    const res = await upvoteReview(review._id, data)
    if (res.status === 'success') {
      //console.log(res.data.review)
      setReview(res.data.review)
    } else {
      //console.log(res.message)
    }
  }

  const handleDownvote = async () => {
    //console.log(userId)
    const data = {
      id: userId,
    }

    // if already downvote
    if (review.downvotes.includes(userId)) {
      //console.log('Already downoted')
      return
    }

    const res = await downvoteReview(review._id, data)
    if (res.status === 'success') {
      setReview(res.data.review)
    } else {
      //console.log(res.message)
    }
  }

  return (
    <Col
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      }}
    >
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography.Title level={3} style={{ margin: 0 }}>
          {review.title}
        </Typography.Title>
        <Rate value={review.rating} style={{ fontSize: '18px' }} disabled />
      </Row>
      <Typography style={{ fontSize: '19px' }}>
        {date.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        by {review.user.name}
      </Typography>
      <Typography style={{ fontSize: '16px', alignItems: 'center' }}>
        <strong
          style={{
            marginRight: '8px',
            color: review.rating >= 3 ? 'green' : 'red',
            marginBottom: 0,
          }}
        >
          {review.rating >= 3 ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: 0,

                fontWeight: 'bold',
                fontSize: '17px',
              }}
            >
              {' '}
              <CheckOutlined /> <span> Recommended </span>{' '}
            </div>
          ) : (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 'bold',
                fontSize: '17px',
              }}
            >
              {' '}
              <CloseOutlined /> <span> Not Recommended </span>{' '}
            </div>
          )}
        </strong>
      </Typography>
      <Typography style={{ fontSize: '16px' }}>
        <strong>Pros:</strong> {review.pros}
      </Typography>
      <Typography style={{ fontSize: '16px' }}>
        <strong>Cons:</strong> {review.cons}
      </Typography>

      <Typography style={{ fontSize: '16px', marginTop: '18px' }}>
        <strong>Description: {'  '}</strong>
        {review.description}
      </Typography>
      <Row style={{ marginTop: '16px' }}>
        <Button
          type='text'
          icon={<LikeOutlined />}
          style={{
            marginRight: '8px',
            color: 'green',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
          onClick={handleUpvote}
        >
          {review.upvotes.length}
        </Button>
        <Button
          type='text'
          icon={<DislikeOutlined />}
          style={{
            marginRight: '8px',
            color: 'red',
            gap: '4px',
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '18px',
          }}
          onClick={handleDownvote}
        >
          {review.downvotes.length}
        </Button>
      </Row>
      {review.response && (
        <Row style={{ marginTop: '16px' }}>
          <Typography.Text style={{ marginRight: '8px' }}>
            <strong>Response:</strong>
          </Typography.Text>
          <Typography.Text style={{ marginRight: '8px' }}>
            {review.response}
          </Typography.Text>
          <Typography.Text>
            {new Date(review.responseDate).toLocaleDateString()}
          </Typography.Text>
        </Row>
      )}
    </Col>
  )
}

export default ReviewComponent
