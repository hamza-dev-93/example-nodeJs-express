var  http = require('http');
var fs = require('fs');

//chargement du server afficher le fichier index.html
var server = http.createServer(function(req, res){
    fs.readFile('./index.html', 'utf-8', function(error, content){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content);
    });

});

// chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte on le note dans le console 
io.sockets.on('connection', function(socket){
    socket.emit('message', 'vous ete bien connecté !!');

     // Quand le serveur reçoit un signal de type "message" du client  (button input Poke)  
     socket.on('message', function (message) {
        // console.log('Un client me parle ! Il me dit : ' + message);
    });	

    //le serveur recuper un pseudo envoyer de client page web
    socket.on('petit_nouveau', function(pseudo){
        socket.pseudo = pseudo;
    })

    socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! he says : ' + message);
    });

    // console.log('un Client viens de se connecter');
    socket.broadcast.emit('message', 'Un autre client vient de se connecter !');
});


server.listen(8080);