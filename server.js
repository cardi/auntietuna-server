console.log("server is listening...")

var express = require('express');
var app = express();
var path    = require("path");
var mysql = require('mysql');
var router = express.Router();

//iterates through router.get functions to pass in files
//to browser
router.use(function(req,res,next){
	next();
});

router.get("/users.css", function(req,res){
	res.sendFile(path.join(__dirname+'/users.css'));
	console.log("GET users.css...");
});

router.get("/", function(req,res){
	res.sendFile(path.join(__dirname+'/users.html'));
	console.log("GET users.html...");
});

router.get("/client.js", function(req,res){
	res.sendFile(path.join(__dirname+'/client.js'));
	console.log("GET client.js...");
});

//initiate router functions
app.use('/', router);

// to access: /usr/local/mysql/bin/mysql -u root -p
// connection to test database in root directory

/*
To access mysql database on my laptop terminal, I needed to mention the directory where I downloaded mysql: /usr/local/mysql/bin/mysql
and then and then go into root. From here I can use commands such as SHOW DATABASES, or use dbname to get into a database.
*/
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sage123&!',
	database: 'test'
});

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

connection.end();
