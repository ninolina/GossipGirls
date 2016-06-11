const express = require('express');
const app = express();
const http = require('http').Server(app);
const hostname = '127.0.0.1';
const port = 3000;

// Socket.io
const io = require('socket.io')(http);

// Load JSON
var jsonData = require('./generated.json');

// Serve static content
app.use(express.static(__dirname + '/public'));

// Set content type to JSON
app.use(function (req, res, next) {
    res.header('Content-Type','application/json');
    next();
});

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// App routing
app.route('/api/players')
    .get(function(req, res) {
        if (req.query.favorites === "true") {
            var output = jsonData.filter(function(x) {
                return x.favorit == true;
            });
            res.send(output);
        } else if (typeof req.query.search != "undefined") {
            var output = jsonData.filter(function(c) {
                return c.name.charAt(0).toLowerCase() === req.query.search.toLowerCase();
            });
            res.send(output);
        } else {
            res.send(jsonData);
        }
    })
    .post(function(req, res) {
        res.json({
            message: "Spieler wurde erfolgreich gespeichert"
        });
    });

app.route('/api/players/:id')
    .put(function(req, res) {
        res.json({
            message: "Spieler mit der ID " + req.params.id + " wurde erfolgreich geupdatet"
        });
    })
    .delete(function(req, res) {
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
	
// Socket.io
io.on('connection', function(socket) {
	
	var addedUser = false;
	
	socket.on('new message', function(data) {
		io.emit('new message', {
			username: socket.username,
			message: data
		});
		console.log('message:' + data);
	});
	
	socket.on('add user', function(username) {
		if (addedUser) return;
		
		// Store username in the socket session
		socket.username = username;
		addedUser = true;
		io.emit('user joined', {
			username: socket.username
		});
		console.log('user: ' + socket.username);
	});
});

http.listen(port, function() {
	console.log("Server running at port: " + port);
});