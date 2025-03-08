import InputField from '../../components/InputField/InputField'
import styles from './styles.module.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import Header from '../../components/Header/Header'
import { verifyEmail } from '../../util/api-call'
import { useSelector } from 'react-redux'
import Button from '../../components/Button/Button'
// State for storing the otp digits
const PhoneOtp = () => {
  const confirmationObj = useSelector((state) => state.confirmObj.obj)

  // State for storing the otp digits
  const [otpDigits, setotpDigits] = useState({
    Digit_1: '',
    Digit_2: '',
    Digit_3: '',
    Digit_4: '',
    Digit_5: '',
    Digit_6: '',
  })

  const [error, setError] = useState('') // State for storing the error message
  const navigate = useNavigate()

  const { Digit_1, Digit_2, Digit_3, Digit_4, Digit_5, Digit_6 } = otpDigits // digits

  // Handle change function for the input fields
  function handleChange(e) {
    const { name, value } = e.target

    setotpDigits((prevdata) => ({
      ...prevdata,
      [name]: value,
    }))

    // move to next input field after checking condtions
    if (e.target.dataset.next && value.length === 1) {
      document.getElementById(e.target.dataset.next).focus()
    }
  }

  // function for handling the submit button
  function handleSubmit(e) {
    e.preventDefault()

    // construct the otp from the state
    const otpFromState =
      Digit_1 + Digit_2 + Digit_3 + Digit_4 + Digit_5 + Digit_6
    // check if the otp from state is equal to the otp from local storage
    try {
      ////console.log(confirmationObj, 'here')
      //await confirmationObj.confirm(otpFromState)
      navigate('/dashboard')

      // Need to Update Backend as well
      // const email = localStorage.getItem('email')
      // const data = { email, verifyEmail: true }
      // make a post request to the server
      // await verifyEmail(data)
    } catch (err) {
      setError('Incorrect OTP')
    }
  }

  return (
    <>
      <Header />
      <div className={styles.centered}>
        <div className={styles.prompt}>
          <>OTP has been sent to your Phone. Enter here for verification</>
        </div>
        <div className={styles.digitgroup}>
          <div>
            <InputField
              Value={Digit_1}
              Id='Digit-1'
              Name='Digit_1'
              DataNext='Digit-2'
              DataPrevious='Digit-1'
              handleChangestate={handleChange}
              MaxLength='1'
              Variant='inputVariantOne'
            />
            <InputField
              Value={Digit_2}
              Id='Digit-2'
              Name='Digit_2'
              MaxLength='1'
              DataNext='Digit-3'
              DataPrevious='Digit-1'
              handleChangestate={handleChange}
              Variant='inputVariantOne'
            />
            <InputField
              Value={Digit_3}
              Id='Digit-3'
              MaxLength='1'
              Name='Digit_3'
              DataNext='Digit-4'
              DataPrevious='Digit-2'
              handleChangestate={handleChange}
              Variant='inputVariantOne'
            />
            <InputField
              Value={Digit_4}
              Id='Digit-4'
              MaxLength='1'
              Name='Digit_4'
              DataPrevious='Digit-3'
              DataNext='Digit-5'
              handleChangestate={handleChange}
              Variant='inputVariantOne'
            />
            <InputField
              Value={Digit_5}
              Id='Digit-5'
              MaxLength='1'
              Name='Digit_5'
              DataNext='Digit-6'
              handleChangestate={handleChange}
              Variant='inputVariantOne'
            />
            <InputField
              Value={Digit_6}
              Id='Digit-6'
              MaxLength='1'
              Name='Digit_6'
              DataPrevious='Digit-5'
              handleChangestate={handleChange}
              Variant='inputVariantOne'
            />
          </div>
          <Button
            Type='submit'
            Variant='btnVariantTwo'
            HandleClick={handleSubmit}
            Title='Submit'
          />
        </div>
        {error && <div className={styles.error_msg}>{error}</div>}
      </div>
    </>
  )
}

export default PhoneOtp
