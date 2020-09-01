var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, response, next) {
  response.send("welcome to the integration session");
  //res.render('index', { title: 'Integracion Express' });
});

router.get('/hello/:name', function(request, response){ 
  response.send('Hello '+ request.params.name ); 
});

module.exports = router;
