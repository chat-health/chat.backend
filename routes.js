var _ = require('underscore');
// XML capability
var builder = require('xmlbuilder');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

// Division of labour inspired by this article
// https://stackoverflow.com/questions/13334051/divide-node-app-in-different-files
var Client = require('./models/client');
var Service = require('./models/service');
var Worker = require('./models/worker');
var Household = require('./models/household');


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

    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newObject = {};

      _.each(reqKeys, function(k) {
        newObject[k] = v[k];
      });

      var client = new Client(newObject);
      client.save(function (err) {
        if (err) throw err;
        // saved!
      });
    });

    res.json(true);
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

  app.get('/household/:id', function(req, res) {
    var household = _.find(households, function (h) {
      return h._id === parseInt(req.params.id, 10);
    });

    if (household) {
      res.json(household);
    } else {
      res.statusCode = 404;
      return res.send('Error 404: No household record found');
    }
  });

  app.post('/households', function(req, res) {

    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newObject = {};

      _.each(reqKeys, function(k) {
        newObject[k] = v[k];
      });

      var household = new Household(newObject);
      household.save(function (err) {
        if (err) throw err;
        // saved!
      });
    });

    res.json(true);
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

  // app.get('/worker/:id', function(req, res) {
  //   var worker = _.find(workers, function (w) {
  //     return w._id === parseInt(req.params.id, 10);
  //   });

  //   if (worker) {
  //     res.json(worker);
  //   } else {
  //     res.statusCode = 404;
  //     return res.send('Error 404: No worker record found');
  //   }
  // });

  app.post('/workers', function(req, res) {

    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newObject = {};

      _.each(reqKeys, function(k) {
        newObject[k] = v[k];
      });

      var worker = new Worker(newObject);
      worker.save(function (err) {
        if (err) throw err;
        // saved!
      });
    });

    res.json(true);
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

  // app.get('/service/:id', function(req, res) {
  //   var service = _.find(services, function (h) {
  //     return h._id === parseInt(req.params.id, 10);
  //   });

  //   if (service) {
  //     res.json(service);
  //   } else {
  //     res.statusCode = 404;
  //     return res.send('Error 404: No service record found');
  //   }
  // });


  app.post('/services', function(req, res) {

    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newObject = {};

      _.each(reqKeys, function(k) {
        newObject[k] = v[k];
      });

      var service = new Service(newObject);
      service.save(function (err) {
        if (err) throw err;
        // saved!
      });

      // services.push(newObject);
      // console.log(services);  
    });

    res.json(true);
  });


  // ************************* PUSH ******************************


  app.get('/visits', function(req, res) {
    res.json(visits);
  });

  app.post('/visits', function(req, res) {
    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newVisit = {};

      _.each(reqKeys, function(k) {
        newVisit[k] = v[k];
      });

      visits.push(newVisit);
      console.log(visits);  
    });

    res.json(true);
  });

  app.get('/attendance', function(req, res) {
    res.json(attendance);
  });

  app.post('/attendance', function(req, res) {
    _.each(req.body, function (v) {
      var reqKeys = _.keys(v);
      var newAttendance = {};

      _.each(reqKeys, function(k) {
        newAttendance[k] = v[k];
      });

      attendance.push(newAttendance); 
    });
    console.log('Request: ', req.body);
    

    res.json(true);
  });

  function retrieveAllFrom (Model) {
    return Model.find().exec();
  }
};