var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extendeds: false });


var app = express();

/* On utilise les sessions */
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
app.use(session({secret: 'todotopsecret'}))
    .use(function(req, res, next){
        if(typeof(req.session.todolist) == 'undefined'){
            req.session.todolist = [];
        }
        next();
    })
    

/* Gestion des routes en-dessous  */

/* On ajoute un élément à la todolist */
app.get('/todo', (req, res) => {
    res.render('todo.html.twig', {todolist: req.session.todolist});
    

})
/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, (req, res) => {
    if(req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo);
        console.log(req.session.todolist);
        console.log(req.body.newtodo);
    }
    res.redirect('/todo');
})
/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.get('/todo/delete/:id', (req, res) => {
    if(req.params.id != ''){
        req.session.todolist.splice(req.params.id, 1);
        console.log(req.params.id);
    }
    res.redirect('/todo');
    console.log(req.session.todolist);
})
/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
});

app.listen(8080);