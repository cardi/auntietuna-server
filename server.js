console.log("server is listening...")

var express = require('express');
var app = express();
var path    = require("path");
var mysql = require('mysql');
var http = require("http");

/*
Following router functionality learned from:
https://www.codementor.io/codeforgeek/build-website-from-scratch-using-expressjs-and-bootstrap-du107sby7
*/
var router = express.Router();

//iterates through router.get functions to pass in files
//to browser
router.use(function(req,res,next){
	next();
});

router.get("/checkmark.png", function(req,res){
	res.sendFile(path.join(__dirname+'/checkmark.png'));
	console.log("GET checkmark.png...");
});

router.get("/trash.png", function(req,res){
	res.sendFile(path.join(__dirname+'/trash.png'));
	console.log("GET trash.png...");
});



router.get("/users.css", function(req,res){
	res.sendFile(path.join(__dirname+'/users.css'));
	console.log("GET users.css...");

});

router.get("/", function(req,res){
	res.sendFile(path.join(__dirname+'/users.html'));
	console.log("GET users.html...");
});


//Send mysql data to url: localhost:3000/data
router.get("/data", function(req,res){
	console.log("get");
	var i = '<h1> hello world </h1>';
	console.log("Printing data......");

	res.json(data);
});


router.get("/client.js", function(req,res){
	res.sendFile(path.join(__dirname+'/client.js'));
	console.log("GET client.js...");

});

router.get("/FileSaver.min.js", function(req,res){
	res.sendFile(path.join(__dirname+'/FileSaver.min.js'));
	console.log("GET FileSaver.min.js...");

});





//initiate router functions
app.use('/', router);

// to access: /usr/local/mysql/bin/mysql -u root -p
// connection to test database in root directory

/*
To access mysql database on my laptop terminal, I needed to mention the directory where I downloaded mysql: /usr/local/mysql/bin/mysql
and then and then go into root. From here I can use commands such as SHOW DATABASES, or use dbname to get into a database.

Adding table info: https://dev.mysql.com/doc/refman/5.5/en/creating-tables.html
*/
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sage123&!',
	database: 'test'
});

// connection.query('SELECT * FROM auntietuna', function(err, results){
// 	if(err) throw err
// 	data = results;
// 	console.log(results);
// });

function sayHello(request, response){
	reponse.send("hello!")
}

var server = app.listen(3000, listening);

function listening(){
	console.log("listening...");
	//console.log(connection);
}

//this is to make a connection to the mysql database
connection.connect(function(err){
	if (err) throw err
	console.log('You are now connected...');
});


connection.query('use test', function(err){
	if(err) throw err
	console.log('connected as id ' + connection.threadId);
});

//currently only displays paypal
//I manually inputed paypal data into auntietuna mysql
var data = [];
var mod;
connection.query('SELECT * FROM auntietuna', function(err, results){
	if(err) throw err
	data = results;
	console.log(data);
});


connection.end();
