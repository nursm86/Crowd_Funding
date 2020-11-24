const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const exsession = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const login = require('./controllers/login');
const home = require('./controllers/home');
const organization				= require('./controllers/organization');
const logout = require('./controllers/logout');
const port = 3000;
const $ = require('jquery');
const path = require('path');
const registration = require('./controllers/registration');
//configuration
app.set('view engine', 'ejs');


//middleware
app.use('/abc', express.static('assets'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exsession({secret: 'hello', saveUninitialized: true, resave: false}));

app.use('/registration', registration);
app.use('/login', login);
app.use('/home', home);
app.use('/logout', logout);
app.use('/organization', organization);
app.use('/jquery',express.static(path.join(__dirname+'/node_modules/jquery/dist/')));  
app.use(express.static(path.join(__dirname+'/public'))); 


//router
app.get('/', (req, res)=>{
	res.send('welcome to this node');
});

//server stratup
app.listen(port, (error) => {
	console.log('server started at '+port);
});