const express = require('express');
const router = express.Router();
const userModel = require.main.require('./models/userModel');
const {check, validationResult} = require('express-validator');

router.get('/', (req, res)=>{
	if(req.session.logout){
		res.redirect('/home');
	}
	const s = req.session.errors;
	req.session.errors = "";
	req.session.destroy();
	res.render('login/index', {msg: s, msg1: req.query.msg1});
});

router.post('/', [ check('username', '**username is required').isLength({min:1}), check('password', '**password is required').isLength({min:1}).withMessage()], (req, res)=>{
	
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		req.session.errors = errors.array()
		res.redirect('/login');
	}else{

		var user = {
		username : req.body.username,
		password : req.body.password
	}
	userModel.validate(user, function(results){
		if(results){
			req.session.uname = req.body.username;
			res.cookie('uid', results[0].id);
			res.cookie('username', results[0].username);
			if(results[0].type == 2 && results[0].status == 1){
				res.redirect('/home');
			}else{
				mg = encodeURIComponent('**user is not verified!!')
				res.redirect('/login?msg1=' +mg);
			}
			
		}else{
			mg = encodeURIComponent('**Invalid username/password!')
			res.redirect('/login?msg1=' +mg);
		}
	});
	}
	
	
	
} );

module.exports = router;