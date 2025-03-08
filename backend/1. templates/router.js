
const express=require( "express" );
const {
  getAll<CNAME>,
  getSingle<CNAME>,
  create<CNAME>,
  update<CNAME>,
  delete<CNAME>} = require( "../controllers/<NAME>Controller" );
const <NAME>Router=express.Router();
//Optimize:   ***** Routes ******
<NAME>Router.route( '/' ).get(getAll<CNAME>).post(create<CNAME>);
<NAME>Router.route( "/:id" )
   .get( getSingle<CNAME> )
   .delete( delete<CNAME> )
   .patch( update<CNAME> )
module.exports=<NAME>Router;