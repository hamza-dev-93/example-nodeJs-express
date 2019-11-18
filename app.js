var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous ete a l accueil sur express js !!');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
app.get('/etages/:etagenum', function(req, res) {
    // res.render('chambre.ejs', {etage: req.params.etagenum});
    res.render('chambre.html.twig', {etage: req.params.etagenum});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});


app.listen(8080);