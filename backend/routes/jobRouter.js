const express=require( "express" );
const {
  getAllJob,
  getSingleJob,
  createJob,
  addApplyClick,
  addClick,
  updateJob,
  deleteJob} = require( "../controllers/jobController" );
const jobRouter=express.Router();

//Optimize:   ***** Routes ******

// global middle ware

jobRouter.route( '/' ).get(getAllJob).post(createJob);
jobRouter.route( "/:id" )
   .get( getSingleJob )
   .delete( deleteJob )
   .patch( updateJob )

   jobRouter.route('/click/:id')
    .patch(addClick);

    jobRouter.route('/apply/:id')
    .patch(addApplyClick);
   
module.exports=jobRouter;