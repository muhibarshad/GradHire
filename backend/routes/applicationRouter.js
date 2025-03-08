
const express=require( "express" );
const {
  getAllApplication,
  getApplicationsByJob,
  getSingleApplication,
  createApplication,
  UnbookMarkApplication,
  bookMarkApplication,
  getMyApplications,
  sendEmail,
  updateApplication,
  acceptApplication,
  rejectApplication,
  deleteApplication} = require( "../controllers/applicationController");
const applicationRouter=express.Router();


applicationRouter.route( '/' ).get(getAllApplication).post(createApplication);

applicationRouter.route( "/:id" )
   .get( getSingleApplication )
   .delete( deleteApplication )
   .patch( updateApplication )

   
applicationRouter.route( "/user/:id" )
.get( getMyApplications)
applicationRouter.route( "/job/:id" )
.get( getApplicationsByJob)


// bookmark
   
applicationRouter.route( "/bookmark/:id" )
.patch( bookMarkApplication);
applicationRouter.route( "/unbookmark/:id" )
.patch( UnbookMarkApplication);


// accept and reject
applicationRouter.route( "/accept/:id" )
.patch( acceptApplication);

applicationRouter.route( "/reject/:id" )
.patch( rejectApplication);

applicationRouter.route( "/sendEmail/:id" )
.patch( sendEmail);

module.exports=applicationRouter;