const Job=require( "../models/jobModel" );
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const factory=require( './handlerFactory' );
//Todo:  ********* helper functuions ***********
// Optimize: get all 

// add a click to the job
exports.addClick=catchAsync( async ( req, res, next ) => {
  
    const job=await Job.findById( req.params.id );
    job.noOfClicks=job.noOfClicks + 1;
    await job.save( { validateBeforeSave: false } );
    res.status( 200 ).json( {
        status: 'success',
        data: {
            job
        }
    } );
} );

// add a click to the job for apply
exports.addApplyClick=catchAsync( async ( req, res, next ) => {
    const job=await Job.findById( req.params.id );
    job.noOfApplicants=job.noOfApplicants + 1;

    await job.save( { validateBeforeSave: false } );

    res.status( 200 ).json( {
        status: 'success',
        data: {
            job
        }

    } );
} );

    
    



exports.getAllJob=catchAsync( async ( req, res, next ) => {
    const job=await Job.find().populate( {
        path: 'company',
        select: 'name'
    } ).lean();
    res.status( 200 ).json( {
        status: 'success',
        results: job.length,
        data: {
            job
        }
    } );
} );

// Optimize: get single data basaed on id
exports.getSingleJob=factory.getOne( Job , { path: 'company' } );
// Optimize: Create  
exports.createJob=factory.createOne( Job );
// Optimize: update based on id 
exports.updateJob=factory.updateOne( Job )
// Optimize: delete  based on id 
exports.deleteJob=factory.deleteOne( Job );
