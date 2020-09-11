const mongoose = require('mongoose')
const express = require ('express')
const Blogschema = require('./models/crmModels.js');
 
const router = new express.Router()

const blogModel = mongoose.model('Blog',Blogschema); 

//for first view always
router.get('/',function(req,res){
	res.sendfile('faltu.html');
})
//for login call
router.get('/login',function(req,res){
	res.sendfile('login.html');
})
//for sign up call
router.get('/signup',function(req,res){
	res.sendfile('signup.html');
})

//input the data for enquiry
router.post('/enquiry',async (req,res) => {
	const blog = new blogModel (req.body)

	try{
		const info = await blog.save()
		res.status(201).sendfile('faltu.html')

	}catch(e){
        res.status(400).send(e)
	}
	
})

//this post for login
router.post('/user/login',async (req,res) => {
	try{
		const user = await blogModel.findByCredentials(req.body.email , req.body.password)
        res.send(user)
	}catch(e) {
        res.status(400).send(e)
	}
})

 // app.post('/saka1',function(req, res){
 // 	const blog = new blogModel(req.body);

 // 	blog.save().then(() => {
 // 		res.status(201).send(blog)
 // 	}).catch((e) =>{
 // 		res.status(400).send(e)
 // 	})
 // })

//output the  data
router.get('/user',async(req,res) =>{
	try{
 	const sak = await blogModel.find({})
	res.status(200).send(sak)
}catch(e){
	res.status(400).send(e)
}
})
 // app.get('/saka1',(req,res) => {
 // 	blogModel.find({}).then((saka1) => {
 // 		res.send(saka1)
 // 	}).catch((e) =>{

 // 	})
 // })

//get the data by id
router.get('/user/:id' , async(req,res) =>{
	const _id = req.params.id

	try{
		const idcall = await blogModel.findById(_id)
	if(!idcall){
		return res.status(404).send()
	}
	res.status(200).send(idcall)
}catch(e){
	res.status(400).send(e)
}
})

 // app.get('/saka1/:id',(req,res) =>{
 // 	const _id = req.params.id

 // 	 blogModel.findById(_id).then((blogModel)=>{
 // 	 	if(!blogModel){
 // 	 		return res.status(404).send()
 // 	 	}
 // 	 	res.send(saka1)
 // 	 }).catch((e) =>{
 // 	 	res.status(500).send()
 // 	 })
      
 // })

 //how to update by id
 router.patch('/user/:id' , async(req,res) =>{
 	const _id = req.params.id

 	// invalid update stopping
 	const updates = Object.keys(req.body)                          //Object.keys is the call the Array data
 	const allowedUpdates = ['name','email','password','age']
 	const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) //every is used to count every array elements
 		                                                                           //includes is used for the specific include
 	
 	if(!isValidOperation){
 		return res.status(400).send({error:'invalid operation'})
 	}

    //for mongoose update
 	try{ 
 		const idupdate = await blogModel.findById(_id)
 		updates.forEach((update)=>{
           idupdate[update] = req.body[update]
 		})
 		await idupdate.save();
 		//const idupdate = await blogModel.findByIdAndUpdate(_id ,req.body,{new: true ,runValidator: true})
 		if(!idupdate){
 			return res.status(404).send()
 		}
        res.status(200).send(idupdate)
 	}catch(e){
        res.status(400).send(e)
 	}
 })

//
//**// passing the values to test DataBase in first time
// const cat= mongoose.model('cat',{name:String,age:String});
// const kitty = new cat({name:'mimi',age:'sixteen'});
// kitty.save().then((res)=>{
// 	console.log(res);
// 	console.log('meowww updated');
// })
//

// todelete the data base by id
router.delete('/user/:id',async(req,res) =>{
	const _id = req.params.id

	try{
	const idDelete = await blogModel.findByIdAndDelete(_id)
	if(!idDelete){
           return res.status(400).send()
	}
	res.status(200).send(idDelete)
}catch(e){
	res.status(400).send(e)
}
})

module.exports= router ; 