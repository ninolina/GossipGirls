$(document).ready(function () {
        var socket = io();
        var username;
        var inputField = $('#msg');
        var messageField = $('#messages');

        function setChatUser() {
            username = inputField.val().trim();
            if (username) {
                inputField.val('');
                socket.emit('add user', username);
            }
        }

        function sendMessage() {
            var message = inputField.val();
            if (message && username) {
                inputField.val('');
                socket.emit('new message', message);
            }
        }

        // Scroll textarea to bottom line, when changes are registered
        function scrollToBottom(area) {
            area.scrollTop(area[0].scrollHeight);
        }

        $('form').submit( (e) =>{
            e.preventDefault();

            if (username) {
                // post message for added chat user
                sendMessage();
            } else {
                // add new chat user
                setChatUser();
            }
         
        });

        // Listen to the broadcasts
        socket.on('new message', (data) =>{
            messageField.append(data.username + ": " + data.message + "\n");
            scrollToBottom(messageField);
        });

        socket.on('user joined', (data) =>{
            messageField.append('Willkomen ' + data.username + "\n");
            scrollToBottom(messageField);
        });
});

