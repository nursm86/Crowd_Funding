const express = require('express');
const router = express.Router();
const userModel = require.main.require('./models/userModel');
const {body, validationResult} = require('express-validator');


router.get('*', (req, res, next)=>{
	if(!req.session.logout){
		next();
	}else{
		res.redirect('/home')
	}
});

router.get('/', (req, res)=>{
	var s = req.session.errors;
	req.session.errors = "";
	res.render('registration/index', {msg1 : s, msg: req.query.msg});
});

router.post('/', [body('username', 'username should be atleast 2 characters').isLength({min: 2}), body('email', 'Email is not valid').isEmail()
        .normalizeEmail(), body('password', 'password should be atleast 4 characters').isLength({min: 4})], (req, res)=>{	
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		req.session.errors = errors.array()
		res.redirect('/registration');
	}else{
	var data = {
		username : req.body.username,
		email : req.body.email,
		password : req.body.password
	}
	userModel.checkgmail(data, function(status){
		if(status){
			userModel.insertorganization(data, function(status){
			if(status){
				var msg = encodeURIComponent("**user registered");
				res.redirect('/login?msg=' + msg);
			}
	});
		}else{
			var msg = encodeURIComponent("**email/username already exist");
			res.redirect('/registration?msg='+msg);
		}
	});}
});

module.exports = router;