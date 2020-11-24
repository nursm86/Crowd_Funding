const express 	= require('express');
const router 	= express.Router();
const userModel = require.main.require('./models/userModel')
const {body, validationResult} = require('express-validator');
const fs = require("fs");
const multer = require('multer');
const path = require('path');

router.get('*', (req, res, next)=>{
	if(req.session.uname){
		next();
	}else{
		res.redirect('/login')
	}
});

router.get('/create', (req, res)=>{
	var s = req.session.errors;
	req.session.errors = "";
	res.render('organization/create', {msg1: s, msg : req.query.msg});
	
});

router.post('/create', [body('target_fund').isLength({min: 1}).withMessage('target fund required').isFloat().withMessage('target_fund should be numeric'), body('campaigntype', 'campaign type required').isLength({min: 1}), body('description', 'description should be at lest 20 character').isLength({min: 20}), body('enddate', 'end date required').isLength({min: 1}), body('title', 'title should be at lest 4 character').isLength({min: 4})], (req, res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		req.session.errors = errors.array();
		
		res.redirect('/organization/create');
	}else{
	var campaign = {
		number : req.cookies['uid'],
		target_fund : req.body.target_fund,
		campaigntype : req.body.campaigntype,
		description : req.body.description,
		publishdDate: req.body.publishdDate,
		enddate : req.body.enddate,
		title : req.body.title
	}
	userModel.checkcampaigns(campaign, function(status){
		if(status){
			upload(req, res, (err)=>{
			if(err){
				console.log(err);
				var err = encodeURIComponent(err);
				res.redirect('/organization/create?msg='+err);
			}else{
				console.log('err');
				if(req.file == undefined){
					var msg = encodeURIComponent( 'Error: No file Selected') ;
					res.redirect('/organization/create?msg='+msg);
				}
			}
	});
		userModel.insert(campaign, function(status){
		if(status){
			res.redirect('/home/campaignlist');
		}else{
			res.redirect('/organization/create');
		}
	});
		}else{
			var mg = encodeURIComponent("**Campaigns title already exist!!");
			res.redirect('/organization/create?msg='+mg);
		}
	});}
});

router.get('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:endDate/:title', (req, res)=>{
	var currentCampaign = {
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		endDate: req.params.endDate,
		title: req.params.title
	};
	req.session.currentCampaign = currentCampaign;
	var s = req.session.errors;
	res.render('organization/edit', {currentCampaign, msg1: s});
});

router.post('/edit/:id/:target_fund/:raised_fund/:ctype/:description/:image/:endDate/:title', [body('target_fund').isLength({min: 1}).withMessage('target fund required').isFloat().withMessage('target_fund should be numeric'), body('campaigntype', 'campaign type required').isLength({min: 1}), body('description', 'description should be at lest 20 character').isLength({min: 20}), body('enddate', 'end date required').isLength({min: 1}), body('title', 'title should be at lest 4 character').isLength({min: 4})], (req, res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		req.session.errors = errors.array();
		var currentCampaign = req.session.currentCampaign;
		res.render('organization/edit', {currentCampaign, msg1: req.session.errors});
	}else{

		var Campaigns = {
		id : req.params.id,
		target_fund : req.body.target_fund,
		campaigntype : req.body.campaigntype,
		description : req.body.description,
		enddate : req.body.enddate,
		title : req.body.title
	};
	userModel.update(Campaigns, function(status){
		if(status){
			res.redirect('/home/campaignlist');
		}else{
			res.redirect('/organization/edit');
		}
	});
	}
	
});

router.get('/view/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publishDate/:endDate/:title', (req, res)=>{
	var currentCampaign = {
		uid : req.params.uid,
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		publishDate: req.params.publishDate,
		endDate: req.params.endDate,
		title: req.params.title
	};
	res.render('organization/view', currentCampaign);
});

router.get('/deletebookmarks/:id', (req, res)=>{
	var currentCampaign = {
		id : req.params.id
	};
	userModel.deletebookmarks(currentCampaign, function(status){
		if(status){
			var mg = encodeURIComponent('**deleted!!');
			res.redirect('/home/bookmarkslist?msg=' + mg );
		}
	});
});

router.get('/report/:id/:uid', (req, res)=>{
	req.session.rid = req.params.id;
	req.session.ruid = req.params.uid;
	var s = req.session.errors;
	req.session.errors = "";
	res.render('organization/description', {msg1:s});
	
});

router.post('/report/:id/:uid', [body('Description', 'description should be at least 10 characters').isLength({min: 10})], (req, res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		req.session.errors = errors.array();
		res.redirect('/organization/report/id/uid');
	}else{

		var currentCampaign = {
		id : req.session.rid,
		uid : req.session.ruid,
		description : req.body.Description
	};
	userModel.report(currentCampaign, function(status){
		if(status){
			var mg = encodeURIComponent('*reported!');
			res.redirect('/home/campaignlist?msg='+mg);
		}else{
			console.log("djgdjsgsjgds");	
		}
	});
	}
	
});

router.get('/bookmark/:id/:uid', (req, res)=>{
	
	var currentCampaign = {
		id : req.params.id,
		uid : req.params.uid
	};
	userModel.check(currentCampaign, function(status){
		if(status){
			userModel.bookmarks(currentCampaign, function(status){
			if(status){
				var mg = encodeURIComponent('**bookmarked!');
				res.redirect('/home/campaignlist?msg='+mg);
			}else{
				console.log("djgdjsgsjgds");	
			}
		});
		}else{
			var mg = encodeURIComponent('**already bookmarked!');
			res.redirect('/home/bookmarkslist?msg='+mg);
		}
	});
	
});
router.get('/delete/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{
	var currentCampaign = {
		uid : req.params.uid,
		target_fund : req.params.target_fund,
		raised_fund : req.params.raised_fund,
		ctype: req.params.ctype,
		description: req.params.description,
		image: req.params.image,
		publisedDate: req.params.publisedDate,
		endDate: req.params.endDate,
		status: req.params.status,
		title: req.params.title
	};
	res.render('organization/delete', currentCampaign);
});

router.post('/delete/:id/:uid/:target_fund/:raised_fund/:ctype/:description/:image/:publisedDate/:endDate/:status/:title', (req, res)=>{

	var campaign = {
		id : req.params.id
	};
	userModel.delete(campaign, function(status){
		if(status){
			res.redirect('/home/campaignlist');
		}else{
			res.redirect('/organization/delete');
		}
	});
});

router.post('/uploadimage', (req, res)=>{
	res.render('organization/uploadimage');
});

module.exports = router;