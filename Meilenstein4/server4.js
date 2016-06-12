const express = require('express');
const app = express();
const http = require('http').Server(app);
const hostname = '127.0.0.1';
const port = 3000;

// Socket.io
const io = require('socket.io')(http);

// Load JSON
const jsonData = require('./generated.json');

// Serve static content
app.use(express.static(__dirname + '/public'));

// Set content type to JSON
app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

// App routing
app.route('/api/players')
    .get((req, res) => {
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

app.route('/api/players/:id')
    .put((req, res) => {
        res.json({
            message: 'Spieler mit der ID ' + req.params.id + ' wurde erfolgreich geupdatet'
        });
    })
    .delete((req, res) => {
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

// Socket.io
io.on('connection', (socket) => {

    var addedUser = false;

    socket.on('new message', (data) => {
        io.emit('new message', {
            username: socket.username,
            message: data
        });
        console.log('message:' + data);
    });

    socket.on('add user', (username) => {
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

// Handling errors
app.use((err, req, res, next) => {
    res.sendStatus(err.status);
});

http.listen(port, () => {
    console.log(`Server running at http:${hostname}:${port}`);
});