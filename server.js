/**
 * Created by mjn on 5/7/15.
 */

var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname + '/about.html'));
});

app.get('/assets/js/twitterWidget.js', function(req, res){
    res.set('Content-Type', 'text/javascript');
    res.sendfile('/assets/js/twitterWidget/js');
});

app.use(express.static(__dirname + '/assets'));

app.listen(2988);
console.log('on 2988');
