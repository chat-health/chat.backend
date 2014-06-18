var _ = require('underscore');
// XML capability
var builder = require('xmlbuilder');

// Division of labour inspired by this article
// https://stackoverflow.com/questions/13334051/divide-node-app-in-different-files
var db = require('./db');
// var regex = /\/.*?\//;
var regex = /\/([^\/]*)\//;
var regexXml = /\/([^\/]*)\./;

// ====================== ROUTING ==========================================
module.exports = function (app) {
  // Default route
  app.get('/', function(req, res) {
    res.type('text/plain');
    res.send('This will be the API used by the CHAT Android app for data syncing.\n Add /workers to retrieve all worker records. More to come');
  });


  app.get('/clients', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/clients/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/clients', function(req, res) {
    handlePost(req, res);
  });


  app.get('/households', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/households/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/households', function(req, res) {
    handlePost(req, res);
  });


  app.get('/workers', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/workers/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/workers', function(req, res) {
    handlePost(req, res);
  });


  app.get('/services', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/services/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/services', function(req, res) {
    handlePost(req, res);
  });


  app.get('/health_themes', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/health_themes/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/health_themes', function(req, res) {
    handlePost(req, res);
  });


  app.get('/health_topics', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/health_topics/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/health_topics', function(req, res) {
    handlePost(req, res);
  });


  app.get('/videos', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/videos/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/videos', function(req, res) {
    handlePost(req, res);
  });


  app.get('/resources', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/resources/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/resources', function(req, res) {
    handlePost(req, res);
  });


  app.get('/health_pages', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/health_pages/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/health_pages', function(req, res) {
    handlePost(req, res);
  });


  app.get('/health_selects', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/health_selects/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/health_selects', function(req, res) {
    handlePost(req, res);
  });


  app.get('/topic_videos', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/topic_videos/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/topic_videos', function(req, res) {
    handlePost(req, res);
  });


  app.get('/page_text1', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/page_text1/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/page_text1', function(req, res) {
    handlePost(req, res);
  });


  app.get('/page_select1', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/page_select1/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/page_select1', function(req, res) {
    handlePost(req, res);
  });


  app.get('/page_video1', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/page_video1/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/page_video1', function(req, res) {
    handlePost(req, res);
  });


  app.get('/page_assessment1', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/page_assessment1/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/page_assessment1', function(req, res) {
    handlePost(req, res);
  });


  app.get('/vaccines', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/vaccines/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/vaccines', function(req, res) {
    handlePost(req, res);
  });




  // ************************* PUSH ******************************


  app.get('/visits', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/visits/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/visits', function(req, res) {
    handlePost(req, res);
  });


  // TODO: Colin we need to decide how we put. Proper would be /collection/id
  app.put('/visits', function(req, res) {
    handlePut(req, res);
  });
  // like so
  // app.put('/visits/:id', function(req, res) {
  //   handlePut(req, res);
  // });


  app.get('/attendance', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/attendance/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/attendance', function(req, res) {
    handlePost(req, res);
  });


  app.get('/services_accessed', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/services_accessed/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/services_accessed', function(req, res) {
    handlePost(req, res);
  });


  app.get('/resources_accessed', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/resources_accessed/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/resources_accessed', function(req, res) {
    handlePost(req, res);
  });


  app.get('/health_topics_accessed', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/health_topics_accessed/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/health_topics_accessed', function(req, res) {
    handlePost(req, res);
  });


  app.get('/vaccines_recorded', function(req, res) {
    handleGetAll(req, res);
  });

  app.get('/vaccines_recorded/:id', function(req, res) {
    handleGetByID(req, res, req.params.id);
  });

  app.post('/vaccines_recorded', function(req, res) {
    handlePost(req, res);
  });
};


// ========== Helper function that do the work ;) ===============================
var handleGetAll = function (req, res) {
  var collection = req.route.path.substring(1,req.route.path.length);
  var where = {};
  var columns = null;
  var options = {};
  var last_synced_at = null;
  var encoding = req.param('enc');

  if (req.param('last_synced_at')) {
    last_synced_at = new Date(req.param('last_synced_at'));
    // We want to be able to only retrieve objects with modified_at date being newer
    // than the date given to us via the get 'last_synced_at' parameter
    // {modified_at: {$gt: new Date(2014, 10, 7)}}
    if (last_synced_at && (last_synced_at instanceof Date)) {
      where = {modified_at: {$gt: last_synced_at}};
    }
  }

  // using this post as an orientation on how to do sorting
  // http://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
  if (req.param('sort_by')) {
    // retrieve sort_by URL parameter (has to be in JSON notation)
    sort_by = req.param('sort_by');
    try {
      // we parse the sort statement into a JS object
      sortObj = JSON.parse(sort_by);
      // now we go through the parameters and replace ASC and DESC with 1 and -1
      _.map(sortObj, function(v,k){
        if (v === "ASC") {
          sortObj[k] = 1;
        } else if (v === "DESC") {
          sortObj[k] = -1;
        }
      });
      options.sort = sortObj;
    } catch (e) {
      // sort_by parameter wasn't valid JSON so we return a 400 error (Bad Request)
      res.statusCode = 400;
      return res.send('Error 400: Bad Request - due to parsing error of JSON sort expression. Try this attached to your URL ?sort_by={"sort_1":"ASC","sort_2":"DESC"} ');
    }
  }

  // options = {
  //   skip:0, // Starting Row
  //   limit:9, // Ending Row
  //   sort:{
  //       _id: -1 //Sort by Date Added DESC
  //   }
  // };

  // options.sort = {_id: -1};

  db.retrieveFromWhere (collection, where, columns, options)
    .onFulfill(function (data) {
      if (encoding === "xml") {
        var xmlRoot = builder.create(collection);

        _.each(data, function(d) {
          var dObj = {};
          // the following seems weird but is necessary to make dates work
          // They are stored as ISODate in Mongo and will crash the XML parser
          // Stringifying and parsing back creates a string representation of date that passes the XML parser
          var obj = JSON.parse(JSON.stringify(d.toObject()));
          dObj[collection] = obj;
          dObj[collection]['@id'] = obj._id;

          // This is a hack :/
          // The XML builder seems to break on arrays. Since rob won't need them
          // we are removing them from the XML result
          _.map(dObj[collection], function (v,k) {
            if (Array.isArray(v)) {
              // remove array from object
              delete dObj[collection][k];
            }
          });
          // XML parser dosn't seem to like arrays :(
          xmlRoot.ele(dObj);
        });

        res.writeHead( 200, {'Content-Type': 'text/xml'} );
        res.end( xmlRoot.end() );
      } else {
        res.json(data);
      }
    })
    .onReject(function (reason){
      res.statusCode = 404;
      return res.send('Error 404: Requested data not found. Reason: '+reason.message);
    });
};

var handleGetByID = function (req, res, id) {
  var collection = req.route.path.match(regex)[1];
  var where = {'_id': id};
  var encoding = req.param('enc');

  db.retrieveFromWhere (collection, where)
    .onFulfill(function (data) {
      if (encoding === "xml") {
        var xmlRoot = builder.create(collection);

        _.each(data, function(d) {
          // for xml encoding, we just want to skip the arrays (until we learn from Rob what he wants from them), hence the below
          if (d instanceof Array) {
            console.log("Skipping an array");
          } else {
            var dObj = {};
            // the following seems weird but is necessary to make dates work
            // They are stored as ISODate in Mongo and will crash the XML parser
            // Stringifying and parsing back creates a string representation of date that passes the XML parser
            var obj = JSON.parse(JSON.stringify(d.toObject()));
            dObj[collection] = obj;
            dObj[collection]['@id'] = obj._id;

            xmlRoot.ele(dObj);
          }

        });

        res.writeHead( 200, {'Content-Type': 'text/xml'} );
        res.end( xmlRoot.end() );
      } else {
        res.json(data);
      }
    })
    .onReject(function (reason){
      res.statusCode = 404;
      return res.send('Error 404: Requested data not found. Reason: '+reason.message);
    });
};

var handlePut = function (req, res) {
  var doc = req.body,
      collection = req.route.path.substring(1,req.route.path.length);

  db.updateDocument(collection, doc)
    .onFulfill(function (document) {
      return res.json(true);
    })
    .onReject(function(reason) {
      res.statusCode = 404;
      return res.send(reason.message);
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
