// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDVzx6SnkRAh5rT7NPVpbtCO6F7W0eEKkU',
  authDomain: 'recruuit2.firebaseapp.com',
  projectId: 'recruuit2',
  storageBucket: 'recruuit2.appspot.com',
  messagingSenderId: '338256377229',
  appId: '1:338256377229:web:e90e8f41002a4a06d379c4',
  measurementId: 'G-67J65BZ50J',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
