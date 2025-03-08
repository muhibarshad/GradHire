import React from 'react'
import { Box } from '@mui/material'
import styles from './Slider.module.css'
import { useEffect } from 'react'

function Slider({
  SetQuestion,
  questionNo,
  questions,
  optionValue,
  SetQuestionNo,
}) {
  useEffect(() => {
    SetQuestion(questions[questionNo])
  }, [questionNo])

  return (
    <Box
      display='flex'
      flexDirection='row'
      alignItems='center'
      width='100%'
      paddingLeft='10px'
    >
      {questions.map((index) => {
        return (
          <div className={styles.flex_node} key={questions.indexOf(index) + 1}>
            {questions.length < 10 ? (
              <div
                onClick={() => {
                  SetQuestionNo(questionNo)
                }}
                className={`${styles.node} ${
                  optionValue[questions.indexOf(index)] !== ' '
                    ? styles.nodeComplete
                    : ''
                }  ${
                  questions.indexOf(index) === questionNo
                    ? styles.currentNode
                    : ''
                }`}
              >
                <b> {questions.indexOf(index) + 1}</b>
              </div>
            ) : (
              <div
                className={`${styles.noHeadNode}   ${
                  optionValue[questions.indexOf(index)] !== ' '
                    ? styles.nodeComplete
                    : ''
                }  ${
                  questions.indexOf(index) === questionNo
                    ? styles.currentNode
                    : ''
                } `}
              ></div>
            )}

            {questions.indexOf(index) !== questions.length - 1 ? (
              <div className={styles.connector}></div>
            ) : null}
          </div>
        )
      })}
    </Box>
  )
}

export default Slider
