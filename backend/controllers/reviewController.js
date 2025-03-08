const Review=require( "../models/reviewModel" );
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const mongoose=require( "mongoose" );
const factory=require( './handlerFactory' );
//Todo:  ********* helper functuions ***********
// Optimize: get all 


// upvote
exports.upvote=catchAsync( async ( req, res, next ) => {
    const review=await Review.findById( req.params.id );

    if ( !review ) {
        return next( new AppError( 'No review found with that ID', 404 ) );
    }

    // convert id to object
    const id=mongoose.Types.ObjectId( req.body.id );


    review.downvotes=review.downvotes.filter( el => el.toString() !== id.toString() );

    // upvote           
    review.upvotes.push( req.body.id );
   
    await Review.findByIdAndUpdate( req.params.id, review, { new: true, runValidators: true } );
    res.status( 200 ).json( {
        status: 'success',
        data: {
            review
        }
    } );
} );

// downvote
exports.downvote=catchAsync( async ( req, res, next ) => {
    const review=await Review.findById( req.params.id );

    if ( !review ) {
        return next( new AppError( 'No review found with that ID', 404 ) );
    }
   

    // if the user has already upvoted
    review.upvotes=review.upvotes.filter( el => el.toString() !== req.body.id.toString() );


    // check if the user has already upvoted
    if ( review.upvotes.includes( req.body.id ) ) {
        // remove upvote
        const index=review.upvotes.indexOf( req.body.id );
        review.upvotes.splice( index, 1 );
    }
    // downvote
    review.downvotes.push( req.body.id );
    await Review.findByIdAndUpdate( req.params.id, review, { new: true, runValidators: true } );
    res.status( 200 ).json( {
        status: 'success',
        data: {
            review
        }
    } );
} );


exports.getAllReview=factory.getAll( Review );

// Optimize: get single data basaed on id
exports.getSingleReview=factory.getOne( Review );
// Optimize: Create  
exports.createReview=catchAsync( async ( req, res, next ) => {
    // Allow nested routes
    if ( !req.body.company ) req.body.company=req.params.companyId;
    if ( !req.body.user ) req.body.user=req.user.id;
    
    // find if the user has already reviewed the company
    const user = await Review.findOne({company:req.body.company,user:req.body.user});
    if(user){
        return next(new AppError('You have already reviewed this company',400));
    }

    const newReview=await Review.create( req.body );
    res.status( 201 ).json( {
        status: 'success',
        data: {
            review: newReview
        }
    } );
} );

// Optimize: update based on id 
exports.updateReview=factory.updateOne( Review )
// Optimize: delete  based on id 
exports.deleteReview=factory.deleteOne( Review );
