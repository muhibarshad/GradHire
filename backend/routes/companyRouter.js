
const express=require( "express" );
const {
  uploadCompanyPhoto,
  resizeCompanyPhoto,
  getAllCompany,
  getSingleCompany,
  createCompany,
  getCompanyReviews,
  updateCompany,
  deleteCompany,
  addFollower,
  getFollowing} = require( "../controllers/companyController");
  
const companyRouter=express.Router();
//Optimize:   ***** Routes ******
companyRouter.route( '/' ).get(getAllCompany).post(
  uploadCompanyPhoto,
  resizeCompanyPhoto,
  createCompany);
companyRouter.route( "/:id" )
  .get( getSingleCompany )
   .delete( deleteCompany )
   .patch( updateCompany )


companyRouter.route("/reviews/:companyId").get(getCompanyReviews)
companyRouter.route("/addFollower/:companyId").patch(addFollower)
companyRouter.route("/getFollowing/:userId").get(getFollowing)
module.exports=companyRouter;