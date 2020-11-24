const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const router 	= express.Router();

	router.get('*',  (req, res, next)=>{
		if(req.cookies['uname'] == null){
		res.redirect('/login');
		}else{
		next();
		}
	});

//report

	router.get('/report/:id', (req, res)=>{

		var reportid={
			 c_id  : req.params.id,
		 	Uid :	req.cookies['id']
		};
	
	
	//console.log("getworks");
		res.render('user/report', reportid);
	
	});

	router.post('/report/:id', (req, res)=>{


	var report = {
		uid :	req.cookies['id'],
 		cid : req.body.cid,
 		description : req.body.description,
 		 u_date : req.body.U_date

		};


	userModel.insertReport(report, function(status){
		if(status){
			
			console.log('inserted report');
			res.redirect('/home/campaigns');
		}else{
			
			console.log('not inserted report');
		}
	});

	});

//bookmarks
	router.get('/bookmarks/:id', (req, res)=>{
		var d= new Date();
		month= d.getMonth().toString();
		date = d.getDate().toString();

		date=date+"-"+month;
		var bookmarkID ={
		cid : req.params.id,
		uid :	req.cookies['id'],
		u_date : date
		};
		userModel.insertbookmarks(bookmarkID, function(status){
		if(status){
			//console.log("book");
				var mg = encodeURIComponent('**bookmarked!');
				res.redirect('/home/campaigns?msg='+mg);
		}else{
			//res.redirect('/login');
			console.log('not inserted bookmark');
		}
		});
	
	});

	router.post('/bookmarks/:id', (req, res)=>{

	});

//edit
		router.get('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{

		var retrive_campaigns ={
			c_id : req.params.id,
			uid :	req.cookies['id'],
			target_fund : req.params.target_fund,
			raised_fund : req.params.raised_fund,
			ctype 		: req.params.ctype,
			description : req.params.description,
			image 		: req.params.image,
			publisedDate: req.params.publisedDate,
			endDate		: req.params.endDate,
			status		: req.params.status,
			title		: req.params.title
			};
	
		res.render('user/edit', retrive_campaigns);
	});

		router.post('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{

			var user = {
			c_id : req.body.id,
			uid :req.cookies['id'],
			target_fund: req.body.target_fund,
			raised_fund: req.body.raised_fund,
			ctype		:  req.body.ctype,
			description	: req.body.description,
			image :  'false_image', //req.body.img
			Publish_date: req.body.Publish_date,
			endDate		: req.body.endDate,
			status : req.body.status,
			title :  req.body.title
		

		};
		userModel.update(user, function(status){
			if(status){
			
			console.log('update');
			res.redirect('/home/campaigns');
			}else{
		
			console.log('not update');
			}
		});
	});

//deleted
	

		router.get('/delete/:id', (req, res)=>{
			var deleteCampaigns ={
			c_id : req.params.id
			};

			userModel.delete(deleteCampaigns, function(status){
			if(status){
			
			console.log('deleted');
			res.redirect('/home/campaigns');
			}else{
			//res.redirect('/login');
			console.log('not deleted');
			res.redirect('/home/campaigns');
			}
		});

	
	});

		router.post('/delete/:id', (req, res)=>{
		
	});
//search
	router.post('/search',function(req,res){
//extract key using req.query.key
//call MySQL Query.
//form JSON response and return.
	console.log("search");
	});


module.exports = router;

