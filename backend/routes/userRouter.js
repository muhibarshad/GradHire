const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const router = express.Router();
const {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser, dummy} = require( "../controllers/userController");


router.post(
  '/signup',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup
)
router.post('/login', authController.login);
// router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
router.patch('/verifyEmail/:id', userController.verifyEmail);

//Optimize:   ***** Routes ******
router.route( '/' ).get(dummy, getAllUser).post(createUser);

router.route('/addFavourite/:id')
.patch(userController.addFavourite);

router.route('/removeFavourite/:id')
.patch(userController.removeFavourite);

router.route('/getFavoriteJobs/:id')
.get(userController.getFavouriteJobs);

router.route('/addCompany/:id')
.patch(userController.addCompany);

router.route('/removeCompany/:id')
.patch(userController.removeCompany);

router.route( "/:id" )
   .get( getSingleUser )
   .delete( deleteUser )
   .patch( updateUser )



module.exports=router;
/*
{
  "photo": "user-1715230165826.jpeg",
  "name": "Ali",
  "email": "ali@gmail.com",
  "password": "9876aliabdullah",
   "passwordConfirm":"9876aliabdullah"
   }

*/