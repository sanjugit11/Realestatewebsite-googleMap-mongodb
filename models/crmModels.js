const mongoose = require('mongoose');
var schema = mongoose.Schema; //everything in mongoose is schema
const validator = require('validator');
const bcrypt = require('bcryptjs');


const blogSchema = new schema({
	name: {
		type: String,
		required:true,
		minlength:4,
		maxlength:150
	},
	  email: {
        type: String,
        unique: true,     //only on email is approved
        required:true,
        lowercase: true,
        validate(value){
        	if(!validator.isEmail(value)){
              throw new Error('Email is  not valid') ;
        	}
        }  
	},
	 contact:{
	  	type : Number,
	  	required: true,
	  	minlength: 10,
	  	trim:true
	  	// validate(value){
	  	// 	if(value.toLowerCase().includes('password'))
	  	// 	{
	  	// 		throw new Error('you can not put password as password')
	  	// 	}
	  	// }
	},
    
	 comment:{
		type: String,
		
		trim: true   
		// validate(value){
		// 	if(value < 0 ){
		// 		throw new Error ('age should be positive')
		// 	} 
		// }

	}
	
},   
	 {
 		timestamps:true         //tell us about the update and insert time
}); 

//for the login we are making self function finByCredentials
    blogSchema.statics.findByCredentials= async (email, password) => {
        const user = await blogModel.findOne({ email }) 

        if(!user){
        	throw new Error('user not find')
        }
        const isMatch = await bcrypt.compare(password ,user.password)

        if(!isMatch){

        	throw new Error('user not find')
        }
         return user
    }
	//middle ware to check the password is hashed or not //save event  
	 ////function is here bind and arowfn cant use for bind this
	blogSchema.pre('save' , async function(next) {      
         const user = this
         
         if(user.isModified('password')) {
         	user.password = await bcrypt.hash(user.password , 8)
         }
         console.log('password get changed successfully') 
         next();

	});

module.exports = blogSchema;


