var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var express = require('express');
var moment = require('moment-timezone');
var unqlite = require('unqlite');
var baseDirectory = __dirname;   
const ical = require('ical-generator')



var port = 8080;
var app = express();


const cal = ical({
	domain: 'default.net',
	prodId: {company: 'iut-arles.com', product: 'ical-generator'},
	name: "graph calendar",
	//timezone: 'Europe/Paris'
});

	
app.get('/' , function(req, res){
	
	res.redirect('/diagrame_maker.html');
	res.end();
});
app.get('/exportPage', function(req, res){
	
	
	
	var dateUnique = req.query.dateUnique;
	var ajoutDate = req.query.ajoutDate;
	var readyToSave = req.query.readyToSave;
	
	
	if(ajoutDate == 1){
		
		var addUnit = req.query.addUnit;
		var addNombre = req.query.addNombre;
		var date = req.query.date ;
		var textParent = req.query.textParent;
				
				
		const event = cal.createEvent({
			start: moment(date).add(addNombre, addUnit),
			end: moment(date).add(addNombre, addUnit).add(23, 'hour'),
			timestamp: moment(),
			summary: textParent
		});
		
	}
	else if(dateUnique == 1)
	{
		

			
		var date = req.query.date ;
		var textParent = req.query.textParent;
					
				
		const event = cal.createEvent({
			start: moment(date),
			end: moment(date).add(23, 'hour'),
			timestamp: moment(),
			summary: textParent
		});
	}
			
	else if(dateUnique == -1)
	{

		var date = req.query.date;
		var date2 = req.query.date2;
		var textParent = req.query.textParent;
		
		const event = cal.createEvent({
			start: moment(date),
			end: moment(date2).add(1, 'day'),
			timestamp: moment(),
			summary: textParent
		});
			
	}
	
	if(readyToSave === 1) 
	{
	

		
			

	}

res.end();

	
});
app.get('/download', function(req, res){
	cal.serve(res);
	
			var directorySave = './bdd/save/' + moment() + '.db';
		
		var graphJason = cal.toJSON();
		
		
		const json = JSON.stringify(graphJason);

		
		var db = new unqlite.Database(directorySave);
			
		 
		db.open(unqlite.OPEN_CREATE, function(err){
			if(err) throw err;
			db.store(String(moment()), json , function(err, key, value){
				db.close(function(err){
				});
			});
		});

	cal.clear()
	res.end();
	
});


//permet de faire appelle a la page html et toutes ses dépendance
app.use(express.static(__dirname));



var serve = app.listen(8080);

console.log("listening on port " + port);
