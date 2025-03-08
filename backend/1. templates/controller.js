const <CNAME>=require( "../models/<NAME>Model" );
const catchAsync=require( "../utils/catchAsync" );
const AppError=require( "../utils/appError" );
const factory=require( './handlerFactory' );
//Todo:  ********* helper functuions ***********
// Optimize: get all 
exports.getAll<CNAME>=factory.getAll( <CNAME> );

// Optimize: get single data basaed on id
exports.getSingle<CNAME>=factory.getOne( <CNAME> );
// Optimize: Create  
exports.create<CNAME>=factory.createOne( <CNAME> );
// Optimize: update based on id 
exports.update<CNAME>=factory.updateOne( <CNAME> )
// Optimize: delete  based on id 
exports.delete<CNAME>=factory.deleteOne( <CNAME> );
