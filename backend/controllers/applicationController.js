const Application=require( "../models/applicationModel" );
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const factory=require( './handlerFactory' );
const { emailJobAcceptance } = require("../utils/emailHtml");
const sendEmail = require("../utils/email");
//Todo:  ********* helper functuions ***********
// Optimize: get all 
exports.getAllApplication=factory.getAll( Application, { path: 'job' }, { path: 'user' } );

// bookMark application
exports.bookMarkApplication = catchAsync(async (req, res, next) => {
    const application = await Application.findById(req.params.id);
  
    if (!application) {
      return next(new AppError('No application found with that ID', 404));
    }
  
    application.bookmarked = !application.bookmarked;
    await application.save({ validateBeforeSave: false });
  
    // Populate the "job" and "user" fields only if the application is found
    await application
      .populate('job')
      .populate('user')
      .execPopulate();
  
    res.status(200).json({
      status: 'success',
      data: {
        data: application,
      },
    });
  });
  
// Un bookMark application
exports.UnbookMarkApplication = catchAsync(async (req, res, next) => {
    const application = await Application.findById(req.params.id);
  
    if (!application) {
      return next(new AppError('No application found with that ID', 404));
    }
  
    application.bookmarked = !application.bookmarked;
    await application.save({ validateBeforeSave: false });
  
    // Populate the "job" and "user" fields
    await application
      .populate('job')
      .populate('user')
      .execPopulate();
  
    res.status(200).json({
      status: 'success',
      data: {
        data: application,
      },
    });
  });
  
// Optimize: get all

// Optimize: get single data basaed on id
exports.getSingleApplication=factory.getOne( Application );

exports.getMyApplications=catchAsync( async ( req, res, next ) => {
    const applications=await Application.find( { user: req.params.id } ).populate( {
        path: 'job',
    }).populate( {
        path: 'user',
    } );
    if ( !applications ) {

        return next( new AppError( 'No application found with that ID', 404 ) );
    }

    res.status( 200 ).json( {
        status: 'success',
        data: {
            data: applications
        }
    } );
} );


// get applications by job
exports.getApplicationsByJob=catchAsync( async ( req, res, next ) => {
    const applications=await Application.find( { job: req.params.id } ).populate( {
        path: 'job',
    }).populate( {
        path: 'user',
    } );
    if ( !applications ) {
        return next( new AppError( 'No application found with that ID', 404 ) );
    }

    res.status( 200 ).json( {
        status: 'success',
        data: {
            data: applications
        }
    } );
} );

// reject application
// Reject application
exports.rejectApplication = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  application.status = 'Rejected';
  await application.save({ validateBeforeSave: false });

  // send all the applications to the user
  // Populate the "job" and "user" fields
  
  await application
    .populate('job')
    .populate('user')
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      data: application,
    },
  });
});

// Accept application
exports.acceptApplication = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  application.status = 'Accepted';
  await application.save({ validateBeforeSave: false });
  


  // Populate the "job" and "user" fields
  await application
    .populate('job')
    .populate('user')
    .execPopulate();

  res.status(200).json({
    status: 'success',
    data: {
      data: application,
    },
  });
});

// send an email
exports.sendEmail = catchAsync(async (req, res, next) => {
  const application = await Application.findById(req.params.id);

  if (!application) {
    return next(new AppError('No application found with that ID', 404));
  }

  application.status = 'Email Sent';
  await application.save({ validateBeforeSave: false });

  // populate the "job" and "user" fields
  await application
    .populate('job')
    .populate('user')
    .execPopulate();

    // populate the company field from job
    await application
    .populate('job.company')
    .execPopulate();


    const emailHtml = emailJobAcceptance(req.body, application.job, application.user);

    const msg = 'Email sent successfully';
    // send the email
    await sendEmail({
      email: application.user.email,
      subject: req.body.subject,
      message: msg,
      html: emailHtml,
    });


  res.status(200).json({
    status: 'success',
    data: {
      data: application,
    },

  });
});



// Optimize: get all
// Optimize: Create  
exports.createApplication=factory.createOne( Application , { path: 'job' }, { path: 'user' } );
// Optimize: update based on id 
exports.updateApplication=factory.updateOne( Application , { path: 'job' }, { path: 'user' } );
// Optimize: delete  based on id 
exports.deleteApplication=factory.deleteOne( Application , { path: 'job' }, { path: 'user' } );
