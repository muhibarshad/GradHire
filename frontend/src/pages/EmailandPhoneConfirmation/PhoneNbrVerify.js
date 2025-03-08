import { useState } from 'react'
import styles from './styles.module.css'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth } from '../../util/firebase'

export default function Phone_validation() {
  // State for Phone Number
  const [phone, setphone] = useState({
    CountryCode: '+92',
    SimCode: '',
    number: '',
  })
  const navigate = useNavigate()

  // Function for handling the Change of State
  function handleChange(e) {
    const { name, value } = e.target
    if (name === 'number' && value.length === 8) {
      return
    }

    setphone((prevdata) => ({ ...prevdata, [name]: value }))

    // move to next input
    if (name === 'SimCode' && value.length === 3) {
      document.querySelector('[name="number"]').focus()
    }
  }
  // function
  const configureCaptcha = (phoneNbr) => {
    ////console.log(auth)
    // set new recaptcha verifier window property
    const recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {},
      auth
    )
    recaptchaVerifier.render()

    return signInWithPhoneNumber(auth, phoneNbr, recaptchaVerifier)
  }

  // function for handling the button click
  async function sendOtp() {
    // if all the fields are filled then sum up the Number
    const { CountryCode, SimCode, number } = phone
    const PhoneNumber = CountryCode + SimCode + number
    //console.log(PhoneNumber)

    //console.log('first')
    try {
      const res = await configureCaptcha(PhoneNumber)
      //console.log(res)
      localStorage.setItem('confirmationResult', JSON.stringify(res))
      navigate('/verifyYourPhoneNbr')
    } catch (err) {
      //console.log(err)
    }
  }
  const verifyOtp = async (phoneNbr) => {}
  return (
    <>
      <Header />
      <div className={styles.centered}>
        <h1 className={styles.prompt}>Two Way Authentication</h1>
        <div className={styles.gridContainer}>
          <p className={styles.prompt}>
            Enter your Phone Number for verification
          </p>
          <div>
            <input
              type='text'
              id='Ccode'
              className={styles.input}
              name='CountryCode'
              value={phone.CountryCode}
              maxLength='10'
              data-next='SimCode'
            />
            <input
              type='number'
              className={styles.simCode}
              name='SimCode'
              data-next='number'
              value={phone.SimCode}
              onChange={handleChange}
              maxLength='3'
            />

            <input
              type='number'
              className={styles.number}
              name='number'
              value={phone.number}
              onChange={handleChange}
              maxLength='7'
            />
            <div id='recaptcha-container' className={styles.recaptcha}></div>
            <button
              id='sign-in-button'
              className={styles.send_btn}
              onClick={sendOtp}
            >
              Send Code
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
