const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	req.session.uname  =  "";
	req.session.rid = "";
	req.session.ruid = "";
	req.session.errors = "";
	res.clearCookie('uname');
	res.redirect('/login');
});

module.exports = router;