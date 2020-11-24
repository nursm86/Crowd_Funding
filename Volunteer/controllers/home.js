const express 	= require('express');
const bodyParser 		= require('body-parser');
const { check, validationResult }  = require('express-validator');
const urlencodedParser  = bodyParser.urlencoded({extended : false});
const userModel = require.main.require('./models/userModel');

const router 	= express.Router();

	router.get('*',  (req, res, next)=>{
		if(req.cookies['uname'] == null){
		res.redirect('/login');
		}else{
		
		next();
		}
	});

	router.get('/', (req, res)=>{
		var volenteer =	req.cookies['uname'];
		var id =	req.cookies['id'];
		res.render('home/index', {name: volenteer , id: id});
	});

	router.post('/',
urlencodedParser,[
	check('target_fund','target fund field can not be empty!!')
		.exists()
		.not().isEmpty()
		.trim(),
	check('raised_fund', 'raised fund field cannot be empty')
		.exists()
		.not().isEmpty()
		.trim(),
	check('ctype','ctype Field Can not be Empty')
		.exists()
		.not().isEmpty(),
	check('description','description Field Can not be Empty!!!')
		.exists()
		.not().isEmpty(),
	check('Publish_date','publish date Field can not be Empty')
		.exists()
		.not().isEmpty(),
	check('endDate','end date can not be Empty')
		.exists()
		.not().isEmpty(),	
	check('status',' status Field can not be Empty')
		.exists()
		.not().isEmpty(),
		check('title',' title Field can not be Empty')
		.exists()
		.not().isEmpty()],
	 (req, res)=>{

	 	const errors = validationResult(req);
  	  if(!errors.isEmpty()){
        const alert = errors.array();
       var volenteer =	req.cookies['uname'];
		var id =	req.cookies['id'];
		res.render('home/index', {name: volenteer , id: id,alert});  
    }

    else{

	var file;
	var imagename;
	var images;

				if(req.files)
		{	
			console.log("if image");

			 file = req.files.image;
			imagename = file.name;
			images='/upload/'+imagename;
		file.mv('./upload/'+imagename,function(err){
		if(err)
		{
		console.log(err);
		}
		else{
		console.log(imagename+"uploaded");
		}
		})
		}
		var campagions = {
			uid : req.cookies['id'],
			target_fund: req.body.target_fund,
			raised_fund: req.body.raised_fund,
			ctype		:  req.body.ctype,
			description	: req.body.description,
			image :  images, //req.body.img
			Publish_date: req.body.Publish_date,
			endDate		: req.body.endDate,
			status : req.body.status,
			title :  req.body.title
		

	};
			
	userModel.insert(campagions, function(status){
		if(status){
			//res.cookie('uname', req.body.username);
			//res.redirect('/home');
			console.log('inserted');
			var volenteer =	req.cookies['uname'];
		var id =	req.cookies['id'];
		res.render('home/index', {name: volenteer , id: id});

		}else{
			//res.redirect('/login');
			console.log('not inserted');
		}
	});
}
});


	router.get('/campaigns', (req, res)=>{

		userModel.getAll(function(results){
		res.render('home/userlist', {users: results});
		});

	})

	router.get('/contract', (req, res)=>{

		user ={
		name :	req.cookies['uname'],
		 id : req.cookies['id']
		};
		console.log("contract-find");
		//userModel.getAll(function(results){
		res.render('home/contract',user);
	//	});

	})

	router.post('/contract', (req, res)=>{


	var contract = {
		uid :	req.cookies['id'],
 		description : req.body.description,
 		 u_date : req.body.U_date

		};


	userModel.insertContract(contract, function(status){
		if(status){
			
			console.log('inserted contract');
			var volenteer =	req.cookies['uname'];
			var id =	req.cookies['id'];
			res.render('home/index', {name: volenteer , id: id});
		}else{
			
			console.log('not inserted report');
		}
	});

	});

		router.get('/search',function(req,res){
		var	user ={
				name : req.cookies['uname'],
				id : req.cookies['id']
			}
		console.log("search");
		res.render('home/search',user);
		});
		
		router.post('/search', (req, res)=>{
	title = {
		name : req.body.name
	};

	userModel.search(title, function(results){
		if(results){
			res.json({campaign:results[0]});
		}else{
			res.json({campaign:'error'});
		}
	});
});

module.exports = router;