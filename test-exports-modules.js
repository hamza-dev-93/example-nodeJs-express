var monmodule = require('./monmodule');
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en ** markdown**'));
console.log( markdown.toHTML( "Hello *World*!" ) );

monmodule.direbonjour();
monmodule.direbyebye();