var fs = require('fs');
var data = fs.readFileSync('data.json');
var userData = JSON.parse(data);

var express = require('express');
var app = express();
var ejs = require('ejs');
var bodyParser = require('body-parser');
var request = require('request');

var config = require('./config.js');
const yelp = require('yelp-fusion');
const client = yelp.client(config.api_key);

console.log("Hello!!! It's starting!");
var server = app.listen(3000, function(){
	console.log("server is running at port 3000");
});

'use strict';

app.use('/assets', express.static('assets'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/home', function(req, res){
    res.render('home', {log: null, create: null})
});

//Home Page
app.post('/home', function(req,res){
	console.log(req.body.button);
	if(req.body.button == "Log In"){
		res.redirect('../login')
	}
	if(req.body.button == "Create Account"){
		res.redirect('../create')
	}
})

app.get('/create', function(req, res){
    res.render('create', {firstname: null, lastname: null, email: null, username: null, password: null, error: null})
});

//Create Account Page
app.post('/create', function(req, res){
	let first = req.body.firstname;
	let last = req.body.lastname;
	let email = req.body.email;
	let username = req.body.username;
	let password = req.body.password;

	if(req.body.button == "Log In"){
		res.redirect('../login')
	}
	if(req.body.button == "Create Account"){
		if (username in userData){
			res.render('create', {error: "Username has been taken, please choose another one!"})
		}
		else{
			if (first == "" || last == "" || email == "" || username == "" || password == ""){
				res.render('create', {error: "All fields are required. Please try again."})
			}else{
				userData[username] = {fs: first, ls: last, mail: email, pw: password, favorites:[]};
				var data = JSON.stringify(userData);
				fs.writeFile('data.JSON', data, finished);
			}
		}
		function finished(err){
			console.log("Finished");
			account = true;
			res.redirect('/login');

		}
	}
}) //end post

app.get('/login', function(req, res){
    res.render('login', {username: null, password: null, error:null})
});

//Log in Page
app.post('/login', function(req, res){
	let username = req.body.username;
	let password = req.body.password;

	if(req.body.button == "Create Account"){
		res.redirect('../create')
	}
	if(req.body.button == "Submit"){
		if (userData[username] !== undefined && userData[username].pw == password){
			finished();
		} else{
			var message = "Username or Password is incorrect. Please try again.";
			if (userData[username] == undefined){
				message = "Account Doesnt Exist, Please try again or create a new account.";
			}
			res.render('login', {error: message})
		}

		function finished(err){
			console.log("Finished");
			res.redirect('/search');

			app.get('/search', function(req, res){
			    res.render('index', {keyword: null, error: null})
			});
		}
	}
}) //end post


//Search Page for a Restaurant
app.post('/search', function(req, res){
	let keyword = req.body.keyword;
	let city = req.body.city;
	let options = [];

	let url = `https://api.yelp.com/v3/businesses/search?term=${keyword}&location=${city}`
	request(url,{'auth': {'bearer': config.api_key}}, function (err, response, body) {
	    if(err){
	      res.render('index', {keyword: null, error: 'Error, please try again'});
	    } else {
	      let place = JSON.parse(response.body);
	      	// let randNum = 0;
			if(place.total >= 20){
				// randNum = Math.floor(Math.random() * 20);
				for (var i = 0; i < 5; i++){
					options.push(place.businesses[i].name);
				}
			} else{
				// randNum = Math.floor(Math.random() * place.total);
				for (var i = 0; i < place.total; i++){
					options.push(place.businesses[i].name);
				}
			}
	        res.render('index', {keyword: 'something', error: null, options});
	    }
	}); //end request
}) //end post

