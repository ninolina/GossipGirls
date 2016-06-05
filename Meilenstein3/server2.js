//-----Server-----

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

var hostname = '127.0.0.1';
var port = 3000;


app.get('/', function (req, res) {
  res.send('Hello!');
});

var parsedJSON;

<<<<<<< Updated upstream

app.get('/api/players', (req, res) => {				//ToDo
	var query = req.param('favorites') || 'false';
	
	if(query === 'true'){
		res.json(200, arr);
	} else if(query === 'false'){
		res.json(200, playersAll);
	} else {
		res.json(404, { message: 'FAIL' });
	}	
=======
/*
 * Loading JSON File from local FS (async call)
 * sync call will be: var parsedJSON = require("./generated.json");
 */
require("fs").readFile("./generated.json", "utf8", function (err, data) {
   if (err) throw err; // TODO error handling
   parsedJSON = JSON.parse(data);
});

app.get("/api/players", function(req, res) {
    if (req.param("favorites") === "true") {
        //filter jsonObj only favorites true
        var fav = parsedJSON.filter(function(x){
           return x.favorit == true; 
        });
        res.send(fav); 
    } else {
        res.send(parsedJSON);
    }
>>>>>>> Stashed changes
});

app.get('/api/players', (req, res) => {				//ToDo
	var query = req.param('search');
	
	if(query === '/[A-Za-z]'){
		res.json(200, playersAll);
	} else {
		res.json(404, { message: 'FAIL' });
	}	
});

app.delete('/api/players/:id', (req, res) => {
	var id = req.param('id');
	res.json(200, {message: 'Spieler mit der ID ' + id + ' wurde erfolgreich gelöscht'});
});

app.post('/api/players', (req, res) => {
	if(req.body) {
		return res.json(200, { message: 'Spieler wurde erfolgreich gespeichert' });
	}

	res.json(404, { message: 'Empty body is not allowed.' });
});

app.put('/api/players/:id', (req, res) => {
	var id = req.param('id');
	res.json(200, {message: 'Spieler mit der ID ' + id + ' wurde erfolgreich geupdatet'});
});

app.listen(port, hostname, function () {
  console.log(`Server running at http:${hostname}:${port}/`);
});