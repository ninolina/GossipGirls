//-----Server-----

const express = require('express');
const app = express();

const http = require('http').Server(app);
var io = require('socket.io')(http);


const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));


const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('Willkommen: ' + msg);
  });
});

var jsonData = require('./generated.json');

// Set content type to JSON
app.use((req, res, next) => {
  res.header('Content-Type','application/json');
  next();
});

// App routing
app.route('/api/players')
	.get((req, res) => {	// get favorites
		if (req.query.favorites === "true") {
			var output = jsonData.filter((x) => {
				return x.favorit == true;
			});
			res.send(output);
		} else if (typeof req.query.search != "undefined") {	// TODO Check Char
			var output = jsonData.filter((c) => {
				return c.name.charAt(0).toLowerCase() === req.query.search.toLowerCase(); 
			});
			res.send(output);
		} else {
			res.send(jsonData);
		}
	})
	.post((req, res) => {
		res.json({
			message: "Spieler wurde erfolgreich gespeichert"
		});
	});

app.route('/api/players/:id') // Update player with id
	.put((req, res) => {
		res.json({
			message: "Spieler mit der ID " + req.params.id + " wurde erfolgreich geupdatet"
		});
	})
	.delete((req, res) => {	// Delete player with id
		var flag = false;
		for (var pos in jsonData) {
			if (req.params.id === jsonData[pos]._id) {
				jsonData.splice(pos, 1);
				flag = true;
			}
		}
		if (flag) {
			res.json({message: 'removed'});
		} else {
			res.json({message: 'not found'});
		}
	});
	
// Portnummer in die Konsole schreiben
http.listen(port, hostname, function() {
	console.log("Server running at " + hostname + ":" + port);
});