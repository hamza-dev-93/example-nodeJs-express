var http = require('http');
var url = require('url');
var querystring = require('querystring');
var EventEmitter = require ('events').EventEmitter;

var server = http.createServer(function(req, res){
    
    var page = url.parse(req.url).pathname;
    console.log(page);
    var params = querystring.parse(url.parse(req.url).query);   

    res.writeHead(200, {"Content-Type": "text/plain"});

    if ('prenom' in params && 'nom' in params) {
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
    }

    if (page == '/') {
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    }
    else if (page == '/sous-sol') {
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') {
        res.write('Hé ho, c\'est privé ici !');
    }

    res.end();
});

var jeu = new EventEmitter();
jeu.on('gameover', function(message){
    console.log(message);
});
jeu.emit('gameover', 'vous ete perdu !! sorry !! ');

server.on('close', function(){
    console.log('bye bye server !! closed');
});

server.listen(8080);
// server.close();