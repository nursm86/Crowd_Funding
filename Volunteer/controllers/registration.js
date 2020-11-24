const express 		= require('express');
const bodyParser 		= require('body-parser');
const { check, validationResult }  = require('express-validator');
const urlencodedParser  = bodyParser.urlencoded({extended : false});
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('home/registration');
});

router.post('/',urlencodedParser,[
	check('username','Name field can not be empty!!')
		.exists()
		.not().isEmpty()
		.trim(),
	check('email','Email Field Can not be Empty')
		.exists()
		.not().isEmpty()
		.isEmail()
		.withMessage('This is not a valid Email'),
	check('password','password Field Can not be Empty!!!')
		.exists()
		.not().isEmpty(),
	check('type','type Field can not be Empty')
		.exists()
		.not().isEmpty(),	
	check('status','status Field can not be Empty')
		.exists()
		.not().isEmpty()
	
],(req, res)=>{
	
	const errors = validationResult(req);
  	  if(!errors.isEmpty()){
        const alert = errors.array();
       var volenteer =	req.cookies['uname'];
		var id =	req.cookies['id'];
	  res.render('home/registration', {alert});  
    }
	else{
	 var user = {
		username: req.body.username,
		email : req.body.email,
		password : req.body.password,
		status : req.body.status,
		type	: req.body.type
	};

	userModel.registration(user, function(status){
		
		if(status){
	 		res.redirect('/login');
			}
		else{
			res.redirect('/registration');
		//	res.render('login/index');
		 }
	});
	}
}); 

module.exports = router;