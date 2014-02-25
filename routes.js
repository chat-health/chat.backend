var _ = require('underscore');
// XML capability
var builder = require('xmlbuilder');

// Division of labour inspired by this article
// https://stackoverflow.com/questions/13334051/divide-node-app-in-different-files
var db = require('./db');
var Client = db.Client;
var Service = db.Service;
var Worker = db.Worker;
var Household = db.Household;
var Visit = db.Visit;


var retrieveAllFrom = function (Model) {
  return Model.find().exec();
};


module.exports = function (app) {
  // Default route
  app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('This will be the API used by the CHAT Android app for data syncing.\n Add /workers to retrieve all worker records. More to come');
  });

  app.get('/clients', function(req, res) {
    retrieveAllFrom (Client)
      .on('complete', function (data) {
        res.json(data);
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });

  app.get('/clients.xml', function(req, res) {
    var xmlRoot = builder.create('clients');
    
    retrieveAllFrom (Client)
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

  app.get('/client/:id', function(req, res) {
    var client = _.find(clients, function (c) {
      return c._id === parseInt(req.params.id, 10);
    });

    if (client) {
      res.json(client);
    } else {
      res.statusCode = 404;
      return res.send('Error 404: No client record found');
    }
  });

  app.post('/clients', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });



  app.get('/households', function(req, res) {
    retrieveAllFrom (Household)
      .on('complete', function (data) {
        res.json(data);
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });

  // app.get('/household/:id', function(req, res) {
  //   var household = _.find(households, function (h) {
  //     return h._id === parseInt(req.params.id, 10);
  //   });

  //   if (household) {
  //     res.json(household);
  //   } else {
  //     res.statusCode = 404;
  //     return res.send('Error 404: No household record found');
  //   }
  // });

  app.post('/households', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });




  app.get('/workers', function(req, res) {
    retrieveAllFrom (Worker)
      .on('complete', function (data) {
        res.json(data);
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });

  app.post('/workers', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });


  app.get('/services', function(req, res) {
    retrieveAllFrom (Service)
      .on('complete', function (data) {
        res.json(data);
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });

  app.post('/services', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });


  // ************************* PUSH ******************************


  app.get('/visits', function(req, res) {
    retrieveAllFrom (Visit)
      .on('complete', function (data) {
        res.json(data);
      })
      .on('err', function (err){
        res.statusCode = 404;
        return res.send('Error 404: Requested data not found');
      });
  });


  app.post('/visits', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });


  app.get('/attendance', function(req, res) {
    res.json(attendance);
  });

  app.post('/attendance', function(req, res) {
    db.storeObjIn(req.body, req.route.path)
      .onFulfill(function (visit) {
        return res.json(true);
      })
      .onReject(function(reason) {
        res.statusCode = 404;
        return res.send(reason.message);
      });
  });
};