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

// router.get('/create', (req, res)=>{
// 	res.render('user/create');
// });


// router.post('/create', (req, res)=>{
	
// 	var user = [req.body.uname, req.body.password, req.body.email];
// 	var newlist = req.session.userlist;
// 	newlist.push(user);
// 	req.session.userlist = newlist;
	
// 	res.send('New user info:'+
// 				"<br> Username: "+req.body.username+
// 				"<br> Password: "+req.body.password+
// 				"<br> Email: "+req.body.email
// 			);
// });

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
			console.log("book");
				var mg = encodeURIComponent('**bookmarked!');
				res.redirect('/home/userlist?msg='+mg);
			//res.cookie('uname', req.body.username);
			//res.redirect('/home');
			console.log('inserted report');
		}else{
			//res.redirect('/login');
			console.log('not inserted report');
		}
	});
	// console.log("bookmarked");
	// console.log(bookmarkID.id);


//res.render('/user/bookmarks');
});

router.post('/bookmarks/:id', (req, res)=>{

});
router.get('/edit/:id', (req, res)=>{

	var editcampaigns ={
		cid : req.params.id,
		uid :	req.cookies['id']
	};
	res.render('user/edit', editcampaigns);
});

router.post('/edit/:id', (req, res)=>{
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
			res.redirect('/home/userlist');
		}else{
		
			console.log('not update');
		}
	});
});

//update
	

router.get('/delete/:id', (req, res)=>{
	var user = {username: 'alamin', password: '123', email: 'email@gmail.com'};
	res.render('user/delete', user);
});

router.post('/delete/:id', (req, res)=>{
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
	userModel.delete(user, function(status){
		if(status){
			//res.cookie('uname', req.body.username);
			//res.redirect('/home');
			console.log('deleted');
			res.redirect('/home/userlist');
		}else{
			//res.redirect('/login');
			console.log('not deleted');
		}
	});
	res.redirect('/home/userlist');
});


module.exports = router;

