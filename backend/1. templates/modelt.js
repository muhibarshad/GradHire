const mongoose=require( 'mongoose' );
const validator=require( "validator" );  
//Optimize:  ********* <NAME> Modal Schema ***********
const <NAME>Schema=new mongoose.Schema( {
    
}, {
  // TO SEE VIRTUAL FIELDS 
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  },
} );

const <CNAME>=mongoose.model( '<NAME>', <NAME>Schema );
module.exports=<CNAME>;