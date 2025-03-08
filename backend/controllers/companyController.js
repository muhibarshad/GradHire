const Company=require( "../models/companyModel");
const User = require("../models/userModel");
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const factory=require( './handlerFactory' );
const fs=require( 'fs' );
const path=require( 'path' );

const multer=require( 'multer' );
const sharp=require( 'sharp' );

//Todo:  ********* helper functuions ***********


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

// upload company photo
exports.uploadCompanyPhoto = upload.single('photo')

// resize Company photo
exports.resizeCompanyPhoto = catchAsync(async (req, res, next) => {
  
  if (!req.file) return next()
  const filename = 'company' + '-' + Date.now() + '.jpeg'
  req.file.filename = filename


  await sharp(req.file.buffer)
    .resize(200, 200)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile('public/img/' + req.file.filename)
 
  req.body.photo = filename
  next()
})


//Todo:  ********* helper functuions ***********
// Optimize: get all 
exports.getAllCompany=catchAsync( async ( req, res, next ) => {
    const company=await Company.find();

    // images
    company.forEach( ( company ) => {
        if ( company.photo ) {
            const image=fs.readFileSync( path.join( __dirname, `../public/img/${company.photo}` ) );

            const base64EncodedImage=image.toString( 'base64' );
            company.photo=base64EncodedImage;
        }
    } );


    
    res.status( 200 ).json( {
        status: 'success',
        results: company.length,
        data: {
            company
        }
    } );
} );

// Get all reviews for a company
exports.getCompanyReviews=catchAsync( async ( req, res, next ) => {
    let filter={};
    if ( req.params.companyId ) filter={ company: req.params.companyId };
    const reviews=await Company.findById( req.params.companyId ).select('reviews').populate( {
        path: 'reviews',
  
    }).lean();
    
    

    res.status( 200 ).json( {
        status: 'success',
        results: reviews.length,
        data: {
            reviews
        }
    } );
} );

// add a follower
exports.addFollower=catchAsync( async ( req, res, next ) => {
    // search for the company
    const company=await Company.findById( req.params.companyId );
    // check if the user is already following the company
    if ( company.followers.includes( req.body.id ) ) {
        return next( new AppError( 'You are already following this company', 400 ) );
    }
    // add the user to the followers list
    company.followers.push( req.body.id );
    await company.save( { validateBeforeSave: false } );

    // find company and populate followers
    const company2=await Company.findById( req.params.companyId ).populate( {
        path: 'reviews',
  
    }).lean();

    // also send image
    if(company2.photo){
        const image = fs.readFileSync(path.join(__dirname, `../public/img/${company2.photo}`))
        
        const base64EncodedImage = image.toString('base64');
        company2.photo = base64EncodedImage
    }

    res.status( 200 ).json( {
        status: 'success',
        data: {
            company2
        }
    } );
} );

// get companies that a user is following
exports.getFollowing=catchAsync( async ( req, res, next ) => {
    // followers is an array of user ids
    const companies=await Company.find( { followers: req.params.userId } ).select( 'name address photo' );
    // also send image
    companies.forEach( ( company ) => {
        if ( company.photo ) {
            const image=fs.readFileSync( path.join( __dirname, `../public/img/${company.photo}` ) );

            const base64EncodedImage=image.toString( 'base64' );
            company.photo=base64EncodedImage;
        }
    } );

    // send only name, address and photo


    res.status( 200 ).json( {
        status: 'success',
        results: companies.length,
        data: {
            companies
        }

    } );
} );





// Optimize: get single data basaed on id
exports.getSingleCompany=factory.getOne( Company, { path: 'reviews jobs' } );
// Optimize: Create  
exports.createCompany=factory.createOne( Company );
// Optimize: update based on id 
exports.updateCompany=factory.updateOne( Company )
// Optimize: delete  based on id 
exports.deleteCompany=
catchAsync( async ( req, res, next ) => {
    const company=await Company.findByIdAndDelete( req.params.id );
    
    if ( !company ) {
        return next( new AppError( 'No company found with that ID', 404 ) );
    }
    

    // send the user back
    res.status( 204 ).json( {
        status: 'success',
        data: null

    } );
}
);
