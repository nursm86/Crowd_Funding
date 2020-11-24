const express = require('express');
const userModel = require.main.require('./models/userModel')
router = express.Router();
const fs = require("fs");
const multer = require('multer');
const path = require('path');

router.get('*', (req, res, next)=>{
	if(req.session.uname){
		req.session.errors = "";
		next();
	}else{
		res.redirect('/login')
	}
});

router.get('/', (req, res)=>{
	campaign = {
		id : req.cookies['uid']
	}
	userModel.history(campaign, function(results){
		res.render('home/index', {msg1: req.query.msg, campaign: results, name : req.cookies['username'], id : req.cookies['uid']});
	});
	
});

router.get('/campaignlist', (req, res)=>{
	userModel.getAll(function(results){
		
		res.render('home/campaignlist', {users: results, msg : req.query.msg});
	});
	
	
});

router.get('/bookmarkslist', (req, res)=>{
	userModel.getAllBookmarks(function(results){
		
		res.render('home/bookmarkslist', {users: results, msg : req.query.msg});
	});
	
	
});

router.post('/show', (req, res)=>{
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


const storage = multer.diskStorage({
	destination: './public/upload',
	filename: function(req, file, cb){
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({
	storage: storage,
	limits: {filesize: 10000000},
	fileFilter: function(req, file, cb){

		checkFileType(file, cb);
	}
}).single('file');

function checkFileType(file, cb){
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	console.log(extname);
	const mimetype = filetypes.test(file.mimetype);
	console.log(mimetype);

	if(mimetype && extname){
		return cb(null, true);
	} else{
		cb('Error: Images Only!');
	}

}

router.post('/', (req, res)=>{
	upload(req, res, (err)=>{
		if(err){
			campaign = {
			id : req.cookies['uid']
			}
			userModel.history(campaign, function(results){
			console.log(results);
			res.render('home/index', {msg1: err, campaign: results, name : req.cookies['username'], id : req.cookies['uid']});
		});
		}else{
			if(req.file == undefined){
				campaign = {
		id : req.cookies['uid']
	}
				userModel.history(campaign, function(results){
			console.log(results);
			res.render('home/index', {msg1: "**Error : No file selected", campaign: results, name : req.cookies['username'], id : req.cookies['uid']});
		});
			}else{
				var mg = encodeURIComponent('File uploaded!');
				  res.redirect('/home?msg='+mg);
			}
		}
	});
});


module.exports = router