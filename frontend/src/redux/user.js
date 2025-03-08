import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user')
let parsedUser = null
try {
  parsedUser = JSON.parse(storedUser)
} catch (error) {
  console.error('Error parsing user from local storage')
}

let storedCompany = localStorage.getItem('company')
let parsedCompany = null
try {
  parsedCompany = JSON.parse(storedCompany)
} catch (error) {
  console.error('Error parsing company from local storage')
}

// get user from local storage
const initialState = {
  id: localStorage.getItem('id'),
  isAuthenticated: localStorage.getItem('login') != null ? true : false,
  // user object in local storage is stringified
  user: parsedUser,
  company: parsedCompany,
  companyID: localStorage.getItem('companyID'),
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true
      state.id = action.payload.id
      state.user = action.payload.user
      state.token = action.payload.token
      state.role = 'user'

      // set to local storage
      localStorage.setItem('id', state.id)
      localStorage.setItem('login', state.id)
      localStorage.setItem('user', JSON.stringify(state.user))
      localStorage.setItem('token', state.token)
      localStorage.setItem('role', 'user')
    },
    logoutSuccess: (state, action) => {
      state.isAuthenticated = false
      state.id = null
      state.user = null
      state.token = null

      localStorage.removeItem('id')
      localStorage.removeItem('login')
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('companyID')
      localStorage.removeItem('company')
    },
    updateUser: (state, action) => {
      state.user = action.payload.user
    },

    switchRole: (state, action) => {
      state.companyID = action.payload.companyID
      state.role = action.payload.role

      if (action.payload.role === 'company') {
        state.company = action.payload.company
        localStorage.setItem('companyID', action.payload.companyID)
        localStorage.setItem('company', JSON.stringify(action.payload.company))
      } else {
        state.company = null
        localStorage.removeItem('company')
      }
    },
    setCopmany: (state, action) => {
      state.company = action.payload.company
      localStorage.setItem('company', JSON.stringify(action.payload.company))
    },
  },
})

export const {
  loginSuccess,
  logoutSuccess,
  updateUser,
  switchRole,
  setCopmany,
} = userSlice.actions

export default userSlice.reducer
