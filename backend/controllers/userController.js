const User=require( "../models/userModel");
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const factory=require( './handlerFactory' );
const multer=require( 'multer' );
const sharp=require( 'sharp' );
const fs=require( 'fs' );
const path=require( 'path' );



const multerStorage = multer.memoryStorage()

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false)
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
})

// upload user photo
exports.uploadUserPhoto = upload.single('photo')

// resize user photo
exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  
  if (!req.file) return next()
  const filename = 'user' + '-' + Date.now() + '.jpeg'
  req.file.filename = filename


  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile('public/img/' + req.file.filename)
 
  req.body.photo = filename
  next()
})


// gettting the current user
exports.getMe = (req, res, next) => {
    req.params.id = req.user.id
    next()
  }


  const photoConvert = (user)=>{
    if(user.photo)
    {
      const image = fs.readFileSync(path.join(__dirname, `../public/img/${user.photo}`))
        
      const base64EncodedImage = image.toString('base64');
  
      user.photo = base64EncodedImage
    
      }  
  }
// verify email
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const user = User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  user.emailVerify = true
  await user.save({ validateBeforeSave: false })
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

exports.updateUser= catchAsync( async ( req, res, next ) => {
  // 1) Find user from collection
  const user = await User.findById( req.params.id ).select( '+password' );

  // check if data is null
  if(req.body.address === '' && req.body.title === '')
  res.status( 200 ).json( {
    status: 'success',
    data: {
      user
    }
  } );


  user.address = req.body.address;
  user.phoneNo = req.body.phone;

  // remove address and phoneNo from req.body
  
  delete req.body.address;
  delete req.body.phone;

  // assign rest whole to user
  user.resume = req.body;

  await user.save( { validateBeforeSave: false } );
  photoConvert(user)

  res.status( 200 ).json( {
    status: 'success',
    data: {
      user
    }
  } );
});

// Add a job to favourite
exports.addFavourite = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  // check if job is already in favourite
  const index = user.favouriteJobs.findIndex((el) => el === req.body.jobId)
  if (index === -1) {
    
    user.favouriteJobs.push(req.body.jobId)
  } else {
    return next(new AppError('Job is already in favourite', 400))
  }

  await user.save({ validateBeforeSave: false })
  photoConvert(user)
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})

// remove a job from favourite
exports.removeFavourite = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }
  
  
  // check if job is already in favourite
  const index = user.favouriteJobs.findIndex((el) => el.equals(req.body.jobId))

  

  if (index !== -1) {
    user.favouriteJobs.splice(index, 1)
  } else {  
    return next(new AppError('Job is not in favourite', 400))
  }

  await user.save({ validateBeforeSave: false })
  photoConvert(user)

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  })
})


// get all favourite jobs
exports.getFavouriteJobs = catchAsync(async (req, res, next) => {

  const user = await User.findById(req.params.id)
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  // populate favourite jobs with their data of name company and id and also populate the company with their name and id
  const jobs = await user.populate({
    path: 'favouriteJobs',
    select: 'title _id'
  }).execPopulate();
  



  res.status(200).json({
    status: 'success',
    data: {
      jobs: jobs.favouriteJobs
    }
  })
})


// put company in user comapnies
exports.addCompany = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  // add company id to user companies
  user.companies.push(req.body.companyId)

  


  await user.save({ validateBeforeSave: false })

  // find user again to populate companies
  const user1 = await User.findById(req.params.id).populate({
    path: 'companies',
    select: 'name _id photo'
  })
  if (user1.companies) {
    user1.companies.forEach(company => {
      if (company.photo) {
        const image = fs.readFileSync(
          path.join(__dirname, `../public/img/${company.photo}`)
        )

        const base64EncodedImage = image.toString('base64')
        company.photo = base64EncodedImage
      }
    })
  }

  photoConvert(user1)

  

  res.status(200).json({
    status: 'success',
    data: {
      user: user1
    }
  })
})

// delete company from user companies
exports.removeCompany = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  
  if (!user) {
    return next(new AppError('No user found with that ID', 404))
  }

  // check if company is in user companies
  const index = user.companies.findIndex((el) => el.equals(req.body.companyId))

  if (index !== -1) {
    user.companies.splice(index, 1)
  } else {
    return next(new AppError('Company is not in user companies', 400))

  }

  await user.save({ validateBeforeSave: false })

  // find user again to populate companies
  const user1 = await User.findById(req.params.id).populate({
    path: 'companies',
    select: 'name _id photo'
  })

  if (user1.companies) {
    user1.companies.forEach(company => {
      if (company.photo) {
        const image = fs.readFileSync(
          path.join(__dirname, `../public/img/${company.photo}`)
        )

        const base64EncodedImage = image.toString('base64')
        company.photo = base64EncodedImage
      }
    })
  }

  photoConvert(user1)

  res.status(200).json({
    status: 'success',
    data: {
      user: user1
    }
  })
})

exports.dummy=(req, res ,next)=>{
  console.log("HI how are you ")
  next();
}


// Optimize: get all with their image

exports.getAllUser=factory.getAll( User );

// Optimize: get single data basaed on id
exports.getSingleUser=factory.getOne( User );
// Optimize: Create  
exports.createUser=factory.createOne( User );
// Optimize: update based on id 

exports.deleteUser=factory.deleteOne( User );
