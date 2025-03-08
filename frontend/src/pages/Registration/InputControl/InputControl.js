import React from 'react'
import styles from './InputControl.module.css'

const InputControl = ({ label, ...props }) => {
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}
      <input type='text' {...props} className={styles.input} />
    </div>
  )
}

export default InputControl
