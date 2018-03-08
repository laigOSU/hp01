var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8315);

app.use(express.static('public'));


app.get('/',function(req,res){
  res.render('home');
});


/* 2. Server-side app.get() route to handle incoming GET request
  and console.log ("I got a GET request")*/
app.get('/home0',function(req,res){
  console.log("This is home0");
  res.render('home0');
});

app.get('/home1',function(req,res){
  console.log("This is home1. I got a GET request");
  res.render('home0');
});



app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
