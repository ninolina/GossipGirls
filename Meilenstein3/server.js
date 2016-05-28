/*var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("It's alive!");
  response.end();
}).listen(3000);*/


/*const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
res.statusCode = 200;
res.setHeader('Content-Type', 'text/plain');
res.end('Hello World\n');
});
server.listen(port, hostname, () => {
console.log(`Server running at http://${hostname}:${port}/`);
});*/


//var playersAll = require('generated.json');
//var playersFav = require('./data/playersFav.json');

'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

const hostname = '127.0.0.1';
const port = 3000;

var server = express.createServer((req, res) => {
	name: 'WAWSS16';
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

server.use(express.bodyParser());
server.use(express.CORS());
server.use(express.queryParser());


server.get('/api/players', (req, res) => {
	var query = req.params.favorites || 'false';

	if(query === 'true'){
		res.json(200, playersAll);
	} else if(query === 'false'){
		res.json(200, playersAll);
	} else {
		res.json(404, { message: 'FAIL' });
	}
});
server.post('/api/players', (req, res) => {
	if(req.body) {
		return res.json(200, { message: 'success' });
	}

	res.json(404, { message: 'Empty body is not allowed.' });
});

server.listen(port, hostname, () => {
 console.log(`${server.name} is listening at ${server.url}`);
});