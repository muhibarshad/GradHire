import React from 'react'
import Header from '../../components/Header/Header'
// import { useNavigate } from 'react-router-dom'
import {
  Stack,
  Box,
  Typography,
  Grid,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material'
import { useState, useEffect, useRef } from 'react'
import Timer from './Timer/Timer'
import Modal from './Modal/Modal'
import Slider from './Slider/Slider'
import styles from './Quiz.module.css'

const allocatedTime = 3 // Dummy Allocated time in Minutes

// Dummy Questions for testing on Quiz
const questions = [
  {
    statement:
      'Which of these features of OOP would indicate code reusability?',
    A: 'Polymorphism',
    B: 'Abstraction',
    C: 'Inheritance',
    D: 'Encapsulation',
    correct: 'Inheritance',
  },
  {
    statement: 'What is your name?',
    A: 'Abdullah',
    B: 'Talha',
    C: 'Fizza',
    D: 'Abid',
    correct: 'Abid',
  },

  {
    statement: 'What are you learning?',
    A: 'Java',
    B: 'No Java',
    C: 'Java No',
    D: 'Never Java',
    correct: 'Java',
  },
  {
    statement: 'What are you learning?',
    A: 'Java',
    B: 'No Java',
    C: 'Java No',
    D: 'Never Java',
    correct: 'Java',
  },
  {
    statement: 'What are you learning?',
    A: 'Java',
    B: 'No Java',
    C: 'Java No',
    D: 'Never Java',
    correct: 'Java',
  },
  {
    statement: 'What are you learning?',
    A: 'Java',
    B: 'No Java',
    C: 'Java No',
    D: 'Never Java',
    correct: 'Java',
  },
  {
    statement: 'What are you learning?',
    A: 'Java',
    B: 'No Java',
    C: 'Java No',
    D: 'Never Java',
    correct: 'Java',
  },
]

function Quiz() {
  //Use to Store the Result when User submits the Quiz
  var result = useRef({})
  //State to Manage and Set Question No
  const [questionNo, SetQuestionNo] = useState(0)
  //State to Set and Show Current Question out of Total Question on Page
  const [question, SetQuestion] = useState(questions[questionNo])
  //State to Gather all the Answers Marked by the User
  const [optionValue, setOptionValue] = useState(
    new Array(questions.length).fill(' ')
  )
  //State to Show and Hide the Result Card Modal when User Submits the Quiz
  const [openModal, setOpenModal] = React.useState(false)

  // Function Handles the Option Marking when User Clicks the One Option
  const handleMarkAnswer = (value) => {
    let answers = optionValue
    answers[questionNo] = value

    setOptionValue([...answers])
  }

  // Function to Handle the Quiz Submission
  const handleSubmission = () => {
    let right = 0

    for (let i = 0; i < optionValue.length; i++) {
      if (questions[i].correct === optionValue[i]) {
        right++
      }
    }
    result.current = {
      totatQuestion: questions.length,
      answered: optionValue.filter((vals) => vals !== ' ').length,
      correct: right,
      incorrect: questions.length - right,
      percentage: (right / questions.length) * 100,
    }

    setOpenModal(true)
  }

  return (
    <Stack direction='column'>
      <Header />

      {/* Modal showing the Results of the Quiz when User Submits */}
      <Modal open={openModal} result={result.current} />

      <Stack
        flexDirection={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Typography variant='h6' mt='10px' ml='20px'>
          Read the Question carefully and Choose the Correct Answer
        </Typography>

        {/* Timer of The Quiz */}
        <Timer time={allocatedTime} handleSubmission={handleSubmission} />
      </Stack>

      {/* Slider that shows the Total Questions and the current Question  */}
      <Slider
        SetQuestion={SetQuestion}
        SetQuestionNo={SetQuestionNo}
        questionNo={questionNo}
        questions={questions}
        optionValue={optionValue}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '1px 1px 5px grey',
          margin: '20px 30px',
          borderRadius: '10px',
          border: '1px blue solid',
        }}
      >
        <Typography variant='h6' align='center' padding={1}>
          Question {questionNo + 1}
        </Typography>

        <Typography variant='h6' align='center'>
          {question.statement}
        </Typography>
        <Box
          sx={{
            margin: '10px auto',
            width: '96%',
            border: '1px grey solid',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          {/* Grid that shows the Options of the Current Question */}
          <Grid paddingLeft={2} container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={12} md={6} width='50vw'>
              <div
                className={`${styles.optionValue} ${
                  optionValue[questionNo] === question.A
                    ? styles.optionValueSelected
                    : ' '
                }`}
                onClick={() => {
                  handleMarkAnswer(question.A)
                }}
              >
                {' '}
                <span>A</span> {question.A}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className={`${styles.optionValue} ${
                  optionValue[questionNo] === question.B
                    ? styles.optionValueSelected
                    : ' '
                }`}
                onClick={() => {
                  handleMarkAnswer(question.B)
                }}
              >
                {' '}
                <span>B</span> {question.B}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className={`${styles.optionValue} ${
                  optionValue[questionNo] === question.C
                    ? styles.optionValueSelected
                    : ' '
                }`}
                onClick={() => {
                  handleMarkAnswer(question.C)
                }}
              >
                {' '}
                <span>C</span> {question.C}
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div
                className={`${styles.optionValue} ${
                  optionValue[questionNo] === question.D
                    ? styles.optionValueSelected
                    : ' '
                }`}
                onClick={() => {
                  handleMarkAnswer(question.D)
                }}
              >
                {' '}
                <span>D</span> {question.D}
              </div>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom section containing the navigation buttons */}
        <Stack
          justifyContent='space-between'
          alignItems='center'
          margin='10px 20px'
          padding='5px'
          direction={{ xs: 'column', sm: 'row' }}
        >
          <Button
            sx={{ marginTop: '10px' }}
            variant='contained'
            size='medium'
            disabled={questionNo === 0 ? true : false}
            onClick={() => {
              SetQuestionNo(questionNo - 1)
            }}
          >
            Previous
          </Button>
          <Button
            sx={{ marginTop: '10px' }}
            variant='contained'
            size='medium'
            onClick={
              questionNo !== questions.length - 1
                ? () => {
                    SetQuestionNo(questionNo + 1)
                  }
                : () => {
                    handleSubmission()
                  }
            }
          >
            {questionNo !== questions.length - 1 ? 'Next' : 'Submit'}
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}

export default Quiz
