import axios from 'axios'

// const url = 'https://recruuit.azurewebsites.net/api/v1/'
const url = 'http://localhost:3001/api/v1/';
const Header = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}
const config = {
  headers: Header,
}
const newHeader = {
  'Content-Type': 'multipart/form-data',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}
const ImageConfig = {
  headers: newHeader,
}

/*
  User Authentication & Authorization
*/
export const signUp = async (data) => {
  try {
    const res = await axios.post(`${url}users/signup`, data, ImageConfig)
    return res.data
  } catch (err) {
    //console.log(err + 'here')
    return err.response.data
  }
}

export const login = async (data) => {
  try {
    const res = await axios.post(`${url}users/login`, data, config)
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export const verifyEmail = async (id) => {
  try {
    const res = await axios.patch(`${url}users/verifyEmail/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const forgotPassword = async (data) => {
  let res
  try {
    res = await axios.post(`${url}users/forgotPassword`, data, config)
    return res.data
  } catch (err) {
    return err.response.data
  }
}

export const resetPassword = async (token, data) => {
  try {
    const res = await axios.patch(
      `${url}users/resetPassword/${token}`,
      data,
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)

    return err.response.data
  }
}

/********** User API calls **********/
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${url}users`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getUser = async (id) => {
  try {
    const res = await axios.get(`${url}users/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const updateUser = async (id, data) => {
  try {
    const res = await axios.patch(`${url}users/${id}`, data, config)
    //console.log(res)

    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// Add a job to user's favourite list
export const addFavourite = async (id, data) => {
  try {
    const res = await axios.patch(
      `${url}users/addFavourite/${id}`,
      {
        jobId: data,
      },
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// Add a job to user's favourite list
export const removeFavourite = async (id, data) => {
  try {
    const res = await axios.patch(
      `${url}users/removeFavourite/${id}`,
      {
        jobId: data,
      },
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// get all jobs in user's favourite list
export const getFavourites = async (id) => {
  try {
    const res = await axios.get(`${url}users/getFavoriteJobs/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

/******** Companies API calls ********/
export const getAllCompanies = async () => {
  try {
    const res = await axios.get(`${url}companies`, config)
    //console.log(res)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getCompany = async (id) => {
  try {
    const res = await axios.get(`${url}companies/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const postCompany = async (data) => {
  //console.log(data)
  try {
    const res = await axios.post(`${url}companies`, data, ImageConfig)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const updateCompany = async (id, data) => {
  try {
    const res = await axios.patch(`${url}companies/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const deleteCompany = async (id) => {
  try {
    const res = await axios.delete(`${url}companies/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const removeCompany = async (id, data) => {
  //console.log('jereee')
  try {
    const res = await axios.patch(
      `${url}users/removeCompany/${id}`,
      {
        companyId: data,
      },
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getReviewsByCompany = async (id) => {
  try {
    const res = await axios.get(`${url}companies/reviews/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// add a follow
export const addFollow = async (id, data) => {
  try {
    const res = await axios.patch(
      `${url}companies/addFollower/${id}`,
      data,
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// get followings by user
export const getFollowings = async (id) => {
  try {
    const res = await axios.get(`${url}companies/getFollowing/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

/// add a company
export const addCompany = async (id, data) => {
  try {
    const res = await axios.patch(`${url}users/addCompany/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

/********** Jobs API calls **********/
export const getAllJobs = async () => {
  try {
    const res = await axios.get(`${url}jobs`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getJob = async (id) => {
  try {
    const res = await axios.get(`${url}jobs/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const updateJob = async (id, data) => {
  try {
    const res = await axios.patch(`${url}jobs/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const deleteJob = async (id) => {
  try {
    const res = await axios.delete(`${url}jobs/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// click on job
export const clickJob = async (id) => {
  try {
    const res = await axios.patch(`${url}jobs/click/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// apply on job
export const applyJob = async (id, data) => {
  try {
    const res = await axios.patch(`${url}jobs/apply/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)

    return err.response.data
  }
}

export const postJob = async (data) => {
  try {
    const res = await axios.post(`${url}jobs`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

/********** Reviews API calls **********/
export const getAllReviews = async () => {
  try {
    const res = await axios.get(`${url}reviews`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getReview = async (id) => {
  try {
    const res = await axios.get(`${url}reviews/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const postReview = async (data) => {
  try {
    const res = await axios.post(`${url}reviews`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const updateReview = async (id, data) => {
  try {
    const res = await axios.patch(`${url}reviews/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const deleteReview = async (id) => {
  try {
    const res = await axios.delete(`${url}reviews/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// upvote
export const upvoteReview = async (id, data) => {
  try {
    const res = await axios.patch(`${url}reviews/upvote/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// downvote
export const downvoteReview = async (id, data) => {
  try {
    const res = await axios.patch(`${url}reviews/downvote/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

/********** Applications API calls **********/
export const getAllApplications = async () => {
  try {
    const res = await axios.get(`${url}applications`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const getApplication = async (id) => {
  try {
    const res = await axios.get(`${url}applications/user/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// by job
export const getApplicationByJob = async (id) => {
  try {
    const res = await axios.get(`${url}applications/job/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const postApplication = async (data) => {
  try {
    const res = await axios.post(`${url}applications`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const updateApplication = async (id, data) => {
  try {
    const res = await axios.patch(`${url}applications/${id}`, data, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const deleteApplication = async (id) => {
  try {
    const res = await axios.delete(`${url}applications/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// bookmark application
export const bookMarkApplication = async (id) => {
  try {
    const res = await axios.patch(`${url}applications/bookmark/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

export const unbookMarkApplication = async (id) => {
  try {
    const res = await axios.patch(`${url}applications/unbookmark/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// accept application
export const acceptApplication = async (id) => {
  try {
    const res = await axios.patch(`${url}applications/accept/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// reject application
export const rejectApplication = async (id) => {
  try {
    const res = await axios.patch(`${url}applications/reject/${id}`, config)
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}

// send email
export const sendEmail = async (id, data) => {
  try {
    const res = await axios.patch(
      `${url}applications/sendEmail/${id}`,
      data,
      config
    )
    return res.data
  } catch (err) {
    //console.log(err)
    return err.response.data
  }
}
