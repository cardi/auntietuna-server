console.log("server is listening...")

var express = require('express');
var app = express();

var mysql = require('mysql');

app.use(express.static('UserSite'));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Sage123&!'
});

function sayHello(request, response){
	reponse.send("hello!")
}

var server = app.listen(3000, listening);

function listening(){
	console.log("listening...");
}

connection.query('CREATE DATABASE IF NOT EXISTS test', function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);

});

connection.end();
