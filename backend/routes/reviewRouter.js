
const express=require( "express" );
const {
  getAllReview,
  getSingleReview,
  createReview,
  updateReview,
  upvote,
  downvote,
  deleteReview} = require( "../controllers/reviewController" );
const reviewRouter=express.Router();
//Optimize:   ***** Routes ******
reviewRouter.route( '/' ).get(getAllReview).post(createReview);
reviewRouter.route( "/:id" )
   .get( getSingleReview )
   .delete( deleteReview )
   .patch( updateReview )

   
   // Upvote 
   reviewRouter.route(
    '/upvote/:id').patch(upvote)

// downvote
reviewRouter.route(
  '/downvote/:id').patch(downvote)

module.exports=reviewRouter;