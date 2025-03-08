import React, { useState, useEffect } from 'react'

import EachQuestion from './EachQuestion'
import { useNavigate } from 'react-router-dom'

import { Card, Button, Typography } from 'antd'

const SetQuestions = () => {
  const navigate = useNavigate()
  const [totalQuestions, setTotalQuestions] = useState(0)

  useEffect(() => {
    const options = JSON.parse(localStorage.getItem('testData'))
    console.log(options)
    setTotalQuestions(+options.noOfQuestions)
  }, [])

  const [questions, setQuestions] = useState([])
  const options = JSON.parse(localStorage.getItem('testData'))

  const handleChange = (event) => {
    // setQuestions({ ...question, [event.target.name]: event.target.value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    // save the test to the database
    const test = {
      title: options.title,
      description: options.description,
      time: options.time,
      passingpassingPercentage: options.passingPercentage,
      testInstructions: options.testInstructions,
      noOfQuestions: options.noOfQuestions,
      questions,
    }

    // const response = await createTest(test)
    // console.log(response)
    // if (response === 200) {
    //   localStorage.removeItem('testOptions')
    //   navigate('/dashboard')
    // } else {
    //   console.log(response)
    // }
  }
  console.log(totalQuestions)
  const addQuestion = (question) => {
    setQuestions([...questions, question])
    setTotalQuestions(totalQuestions - 1)
  }

  return (
    <>
      <Card
        style={{
          width: '60%',
          margin: 'auto',
          marginTop: '50px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        }}
      >
        <Typography.Title
          level={4}
          style={{ textAlign: 'center', marginTop: '20px', color: '#1890ff' }}
        >
          Create Test
        </Typography.Title>

        {totalQuestions > 0 ? (
          <Typography.Title
            level={4}
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            Question {questions.length + 1} of{' '}
            {totalQuestions + questions.length}
            <EachQuestion addQuestion={addQuestion} />
          </Typography.Title>
        ) : (
          <>
            <Typography.Title
              level={6}
              style={{ textAlign: 'center', marginTop: '40px' }}
            >
              Your Test has been created successfully Please click on the button
              below to save your.
            </Typography.Title>

            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: '40px' }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </>
        )}
      </Card>
    </>
  )
}

export default SetQuestions
