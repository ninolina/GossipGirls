//-----Server-----

var express = require('express');
var app = express();

var hostname = '127.0.0.1';
var port = 3000;
var cors = require('cors');

var corsOptions = {
  origin: 'http://localhost'
};

app.get('/', function (req, res) {
  res.send('Hello Regi!');
});

var playersAll = require('./generated.json');

app.use(cors()); 

app.get('/api/players', function(req, res) {
	var query = req.param('favorites') || 'false';
	

	if(query === 'true'){
		res.json(200, playersAll);
	} else if(query === 'false'){
		res.json(200, playersAll);
	} else {
		res.json(404, { message: 'FAIL' });
	}
	
});

app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});