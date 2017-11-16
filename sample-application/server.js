
// setup our required variables
var express = require('express');
var app     = express();
var router  = express.Router();
var path    = __dirname + '/views/'

router.use(function(req,res,next){
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// URL: http://localhost:3000/
// description: sends a static file
router.get('/', function(req,res){
  res.sendFile(path + 'index.html')
});

// URL: http://localhost:3000/time
// description: sends the current time
//
// hit refresh a few times to see the time change
// view the source on the web browser and note that the page is static:
//
// the page is first generated in this node application, and then
// sent to the requesting client.
router.get('/time', function(req,res){

  // get the current time in milliseconds since epoch
  var currentTimeInMs = Date.now();

  // convert the current time to human readable form
  var currentTime = new Date(currentTimeInMs);

  // send raw HTML back as a response
  //
  // (we didn't build use the proper structures, but this is just a
  // demonstration)
  res.send(
    'The current server time is (in milliseconds): ' + currentTimeInMs +
    '<br><br>' + 'The current human-readable server time is: ' + currentTime);
});

app.use('/', router);

app.listen(3000, function() {
  console.log("Live at port 3000");
});
