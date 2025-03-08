const util = require('util');
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const { emailHtml, emailOtp } = require('../utils/emailHtml');
// Sending JWT token and storing it in cookie
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * @desc    Sign up
 * @route   POST /recruuit/api/v1/signup
 * @access  Public
 * @role    User
 *
 * This function is used to create a new user
 */
exports.signup = catchAsync(async (req, res, next) => {
  // check if user is already registered
  console.log(req)
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(new AppError('User already exists', 400));
  }
  // check if the data is valid
  const { name, email, password, passwordConfirm, photo } = req.body;
  if (!name || !email || !password || !passwordConfirm) {
    return next(new AppError('Please provide all the fields', 400));
  }
	
  // Create a new user in the database using the data from the request body
  const newUser = await User.create({
    name,
    email,
    photo,
    password,
    passwordConfirm
  });


  // Sign the token and send it to the client
  const token = signToken(newUser._id);

  // Generate & Send Otp to Email & Phone
  const otp = Math.floor(1000 + Math.random() * 9000);
  const html = emailOtp(otp);
  const message = 'Your OTP is ' + otp;
  // send email
  try {
    sendEmail({
      email: newUser.email,
      subject: 'Recruuit - Verify your email',
      message,
      html
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser,
        otp
      }
    });
  } catch (err) {

    return next(
      new AppError('There was an error verifying the email. Try again later!'),
      500
    );
  }

  // res.status(201).json({
  //   status: 'success',
  //   token,
  //   data: {
  //     user: newUser,
  //     otp
  //   }}
  // );

});

/**
 * @desc    Login
 * @route   POST /recruuit/api/v1/login
 * @access  Public
 * @role    User
 *
 * This function is used to login a user and send a token to the client
 */
exports.login = catchAsync(async (req, res, next) => {
  // 1. Get API data from request body
  const { email, password } = req.body;
  console.log("Hi")
  // 2. Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 3. Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password').populate({ path: 'applications' }).populate({
    path: 'companies',
    select: 'name photo'
  });
  
  


        

  // if not user or password is incorrect
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }


  
  // encode the companies photo if exists
  if (user.companies) {
    user.companies.forEach(company => {
      if (company.photo) {
        const image = fs.readFileSync(
          path.join(__dirname, `../public/img/${company.photo}`)
        )

        const base64EncodedImage = image.toString('base64')
        company.photo = base64EncodedImage
      }
    })
  }
  if(user.photo)
  {
    const image = fs.readFileSync(path.join(__dirname, `../public/img/${user.photo}`))
      
    const base64EncodedImage = image.toString('base64');

    user.photo = base64EncodedImage
  
    }

          

  // 4. If everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      id: user._id,
      user
    }
  });
});

/**
 * @desc    forgot password
 * @route   POST /recruuit/api/v1/forgotPassword
 * @access  Public
 *
 * This function is used to send a reset password link to the user's email
 */
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2. Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send it to user's email
  const resetURL = `${req.protocol}://localhost:3006/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  const html = emailHtml(resetURL);

  // Send email
  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message,
      html
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });


    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

/**
 * @desc    Reset password
 * @route   POST /recruuit/api/v1/resetPassword/:token
 * @access  Public
 *
 * This function is used to reset the password of the user using the reset password link
 *
 */
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. Get User based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2. If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // 3. Update changedPasswordAt property for the user
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 4. Log the user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
});
