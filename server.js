const express =require('express');
const app = express();

const path = require('path');
const mongoose =require('mongoose'); 
const bodyParser = require('body-parser');
const idRouter = require('./router.js')  //to call the router.js file
const bcrypt = require('bcryptjs')


app.use(bodyParser.json()); //for json format
app.use(bodyParser.urlencoded({extended: true})); //for post application to use urlextended
app.use(idRouter);



//connecting mongoose to database name //test is the DB name
mongoose.connect('mongodb://localhost/saka',
	{useNewUrlParser: true , useUnifiedTopology: true }
   );  //or  //process.env.MONGO_URI

console.log('DB connected.....')




// connect to the html,css ,js nad jpg pics
app.use('/static',express.static('public'));

app.get('/', function(req,res){
	res.sendFile(path.join(__dirname,'/faltu.html'));
}); 
console.log('server is running on the port 3000');
app.listen(3000);


//bcrypt
// const inputPassword = async() =>{
// 	const password = '123456'
// 	const hash = await bcrypt.hash(password , 8)

// 	console.log(password)
// 	console.log(hash)

// const isMatch = await bcrypt.compare('123456' ,hash) //for the comapring with the password with the hash
//      console.log(isMatch)	
// }
//   inputPassword()



//upload the image
// const multer = require('multer');
// const upload = multer({
// 	dest:'images'
// })
// app.post('/upload', upload.single('upload'),(req,res) =>{
// 	res.send()
// })
