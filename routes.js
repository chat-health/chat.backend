var _ = require('underscore');
// XML capability
var builder = require('xmlbuilder');

// Division of labour inspired by this article
// https://stackoverflow.com/questions/13334051/divide-node-app-in-different-files
var db = require('./db');

// ====================== ROUTING ==========================================
module.exports = function (app) {
  // Default route
  app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('This will be the API used by the CHAT Android app for data syncing.\n Add /workers to retrieve all worker records. More to come');
  });


  app.get('/clients', function(req, res) {
    handleGet(req, res);
  });

  app.get('/clients.xml', function(req, res) {
    var collection = req.route.path.substring(1,req.route.path.length -4);
    var xmlRoot = builder.create('clients');
    
    db.retrieveAllFrom (collection)
      .on('complete', function (data) {
        _.each(data, function(d) {
          var clientObject = {'client':d.toObject()};
          clientObject.client['@id'] = d.toObject()._id;

          xmlRoot.ele(clientObject);
        });

        res.writeHead( 200, {'Content-Type': 'text/xml'} );
        res.end( xmlRoot.end() );
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });

  // app.get('/client/:id', function(req, res) {
  //   var client = _.find(clients, function (c) {
  //     return c._id === parseInt(req.params.id, 10);
  //   });

  //   if (client) {
  //     res.json(client);
  //   } else {
  //     res.statusCode = 404;
  //     return res.send('Error 404: No client record found');
  //   }
  // });

  app.post('/clients', function(req, res) {
    handlePost(req, res);
  });



  app.get('/households', function(req, res) {
    handleGet(req, res);
  });

  app.post('/households', function(req, res) {
    handlePost(req, res);
  });


  app.get('/workers', function(req, res) {
    handleGet(req, res);
  });

  app.post('/workers', function(req, res) {
    handlePost(req, res);
  });



  app.get('/services', function(req, res) {
    handleGet(req, res);
  });

  app.post('/services', function(req, res) {
    handlePost(req, res);
  });


  // ************************* PUSH ******************************


  app.get('/visits', function(req, res) {
    handleGet(req, res);
  });

  app.post('/visits', function(req, res) {
    handlePost(req, res);
  });


  app.get('/attendance', function(req, res) {
    handleGet(req, res);
  });

  app.post('/attendance', function(req, res) {
    handlePost(req, res);
  });
};


// ========== Helper function that do the work ;) ===============================
var handleGet = function (req, res) {
  var collection = req.route.path.substring(1,req.route.path.length);
  // var collection = route

  db.retrieveAllFrom (collection)
    .onFulfill(function (data) {
      res.json(data);
    })
    .onReject(function (reason){
      res.statusCode = 404;
      return res.send('Error 404: Requested data not found. Reason: '+reason.message);
    });
};

var handlePost = function (req, res) {
  var doc = req.body,
      collection = req.route.path.substring(1,req.route.path.length);

  db.storeObjIn(doc, collection)
    .onFulfill(function (document) {
      return res.json(true);
    })
    .onReject(function(reason) {
      res.statusCode = 404;
      return res.send(reason.message);
    });
};