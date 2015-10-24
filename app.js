/*
	@Autor Jorge A. Atehortua
	@Email jorge.atehortua@gmail.com
*/


//variables o paquetes requeridos
var express = require('express');
var app = express();
var hbs = require('hbs');
var	https = require('https');

/*Organizar la plantilla para la vista*/
app.set('view engine', 'html');
app.engine('html', hbs.__express);

//Assets
app.use(express.static('public'));

/*Rutas*/
app.get('/', function(req, res){
	res.render('index');
});

app.get('/search', function(req, res){
	var endPointSpotify = "https://api.spotify.com/v1/search"+"?q="+req.query.q+"&type=track&limit=10";
	var buffer="";
	https.get(endPointSpotify, function(response){
		response.on('data', function(d){
			buffer+=d;
		});
		response.on('end', function(err){
			if(req.query.q != undefined && req.query.q != ""){
				res.render("index", {items: JSON.parse(buffer).tracks.items});
			}else{
				res.render('index');
			}
		});
	});
});

app.listen(process.env.PORT || 3000, function(){
	console.log('El servidor esta corriendo')
});