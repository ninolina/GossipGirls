const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// Load JSON
const jsonData = require('./generated.json');

// Set content type to JSON
app.use((req, res, next) => {
  res.header('Content-Type','application/json');
  next();
});


// App routing
app.route('/api/players')
	.get((req, res) => {	// Get favorites
		if (req.query.favorites === 'true') {
			let output = jsonData.filter((x) => {
				return x.favorit == true;
			});
			res.send(output);
		} else if (typeof req.query.search != 'undefined') {
			let output = jsonData.filter((c) => {
				return c.name.charAt(0).toLowerCase() === req.query.search.toLowerCase(); 
			});
			res.send(output);
		} else {
			res.send(jsonData);
		}
	})
	.post((req, res) => {
		res.json({
			message: 'Spieler wurde erfolgreich gespeichert'
		});
	});

app.route('/api/players/:id') // Update player with id
	.put((req, res) => {
		res.json({
			message: 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet'
		});
	})
	.delete((req, res) => {	// Delete player with id
		let flag = false;
		for (let pos in jsonData) {
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

// When not-defined routes are being called
app.route('*')
    .get((req, res, next) => {
        let err = new Error();
        err.status = 404;
        next(err);
    })
    .post((req, res, next) => {
        let err = new Error();
        err.status = 422;
        next(err);
    })
    .put((req, res, next) => {
        let err = new Error();
        err.status = 409;
        next(err);
    })
    .delete((req, res, next) => {
        let err = new Error();
        err.status = 404;
        next(err);
    });

// Handling errors
app.use((err, req, res, next) => {
    res.sendStatus(err.status);
});
	
app.listen(port, hostname, () => {
	console.log(`Server running at http:${hostname}:${port}`);
});