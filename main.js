var express = require('express');
var mysql = require('./dbcon.js');

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

/* 5 . In that same GET request, make a simple query to the database and console.log it.*/
app.get('/home1',function(req,res){
  console.log("This is home1. I got a GET request");
  var context = {};
  mysql.pool.query('SELECT * FROM Students', function(err, rows, fields){
  // var queryResult = mysql.pool.query('SELECT * FROM Students', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    console.log("Still from home1",context); //good, consoles the JSON object of students
    //  Now send this data (that we had console.log'd) via res.send() instead of console.log

    res.type('application/json')
    res.send(rows); //ORIGINAL


    // res.send(context.results); //nope doesn't work
    // res.render('home0', {rows});// res.render('home0', context);
    //ok, looks like you can't have res.send and res.render simultaneously
  })

});

// /* 5A. Going to try rendering mysql results without the form's button maybe it's a handlebars prob*/
// app.get('/test',function(req,res){
//   console.log("This is /[root]. I am testing MYSQL render");
//   var context = {};
//   mysql.pool.query('SELECT * FROM Students', function(err, rows, fields){
//   // var queryResult = mysql.pool.query('SELECT * FROM Students', function(err, rows, fields){
//     if(err){
//       next(err);
//       return;
//     }
//     context.results = JSON.stringify(rows);
//     // console.log("Still from home1",context);
//     //  Now send this data (that we had console.log'd) via res.send() instead of console.log
//
//
//     // res.send(context); //ORIGINAL
//
//
//     // res.send(context.results); //nope doesn't work
//     res.render('home0', context);
//   })
//
// });



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
