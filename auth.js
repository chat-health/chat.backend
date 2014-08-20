var jwt = require('jwt-simple');
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var CLIENT_ID = '55000252691-rvdv769veahs88jub2v0s7213p6oom1a.apps.googleusercontent.com';
var CLIENT_SECRET = 'vyujyWl2CU5boee_SQIKtGtP';
var AUTH_API_NAME= 'oauth2';
var AUTH_API_VERSION='v2';
var GOOGLE_TOKEN_PARAMETER_NAME='google_access_token';
var CLIENT_TOKEN_PARAMETER_NAME='client_access_token';
var IS_REQUEST_CLIENT_TOKEN_PARAMETER_NAME ="is_request_clientToken";
var IS_SIGN_OUT_PARAMETER_NAME ="is_sign_out";
var DEVICE_ID_PARAMETER_NAME = 'deviceid';
var JWT_SECRET_KEY = 'chat.backend1';
var REDIRECT_URL = '';

var db = require('./db');

// error code difinition
var ERROR_DEVICE_NOT_EXIST = {errorcode:2001,errormsg:'The device is not authorized'};
var ERROR_GOOGLE_TOKEN_NOT_VALID = {errorcode:2002,errormsg:'The google token is not valid'};
var ERROR_ACCOUNT_NOT_VALID = {errorcode:2003,errormsg:'The account is not in authorized list'};
var ERROR_CLIENT_TOKEN_NOT_VALID = {errorcode:2004,errormsg:'The client token is not valid'};
var ERROR_DATABASE_LOOKUP = {errorcode:2005,errormsg:'database problem during device id lookup'};

var DB_Profile = {};

function setErrorResponse(err,res)
{
  console.log(err);
  res.statusCode=401;
  // set WWW-Authenticate header to avoid problems in Android app
  res.set({
    'Content-Type':'application/json',
    // 'WWW-Authenticate': 'Basic realm="myRealm"'
    'WWW-Authenticate': 'Digest realm="testrealm@host.com",
                 qop="auth,auth-int",
                 uri="/login"
                 nonce="dcd98b7102dd2f0e8b11d0f600bfb0c093",
                 opaque="5ccc069c403ebaf9f0171e9517f40e41"'
  });

  return res.json(err);
}

function getJWTToken(profile)
{
  var token = jwt.encode(profile, JWT_SECRET_KEY);
  return token;
}


var verifyGoogleToken = function (req, res) {
  // options for GET
  var googleToken = req.param(GOOGLE_TOKEN_PARAMETER_NAME);
  console.log('googleToken', googleToken);
  var deviceID=req.param(DEVICE_ID_PARAMETER_NAME);
    console.log('deviceid',deviceID);

  // retrieve auth object from database
  var where = {deviceid: deviceID};
  db.retrieveFromWhere('auth', where)
    .onFulfill(function (authorization_record) {
      if (authorization_record.length > 0) {
        console.log('device id exist');

        // ask google if token is valid and retrieve email address
        googleapis
         .discover(AUTH_API_NAME, AUTH_API_VERSION)
         .execute(function(err, client) {
          var oauth2Client =new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
          console.log('googleToken: ', googleToken);
          oauth2Client.credentials = {
            access_token: googleToken
          };

          // retrieve userInfo
          client
           .oauth2.userinfo.get()
           .withAuthClient(oauth2Client)
           .execute(function(err, userInfo) {

            if (err) {
              setErrorResponse(ERROR_GOOGLE_TOKEN_NOT_VALID,res);
              return;
            }
            else
            {
              //TODO to validate the email here
              console.log(userInfo);

              // retrieve auth object from database
              var where = {deviceid: deviceID, email: userInfo.email};
              db.retrieveFromWhere('auth', where)
                .onFulfill(function (authorization_record) {
                  if (authorization_record.length > 0) {
                    // updata the google_access_token into the profile
                    authorization_record[0].set("google_access_token", googleToken);
                    authorization_record[0].save(function (err, product, numberAffected) {});

                    DB_Profile.email = authorization_record[0].get('email');
                    DB_Profile.google_access_token = authorization_record[0].get('google_access_token');
                    DB_Profile.device_id = authorization_record[0].get('deviceid');
                    // DB_Profile.google_access_token = googleToken;
                    // generate JWT token here
                    var jwtToken = getJWTToken(DB_Profile);
                    // return the jwt token to the app
                    //res.statusCode=200;
                    res.send(200, jwtToken);
                    //res.json("client_access_token",jwtToken);
                  } else {
                    setErrorResponse(ERROR_ACCOUNT_NOT_VALID,res);
                    return;
                  }
                })
                .onReject(function (reason){
                  console.log(reason);
                  setErrorResponse(ERROR_DATABASE_LOOKUP, res);
                  return;
                });
            }
          });
        });
      } else {
        console.log('device id does not exist');
        setErrorResponse(ERROR_DEVICE_NOT_EXIST, res);
        return;
      }
    })
    .onReject(function (reason){
      console.log(reason);
      setErrorResponse(ERROR_DATABASE_LOOKUP, res);
      return;
    });


 //  if(deviceID!=DB_Profile.device_id)
 //  {
  // console.log('device id does not exist');
  // setErrorResponse(ERROR_DEVICE_NOT_EXIST, res);
  // return;
 //  }

 //  console.log('device id exist');


};

// there have one more thing not sure, how to store the profiles
// and do we have different access right among these profiles
// right now, we just compare all the profile in the memory
var verifyClientToken = function(req, res, next){
  // TODO to ignore the '/auth' url request

  //console.log(req.path);
  if(req.path=="/auth")
  {
    console.log(req.path);
    next();
	return;
  }
  if(req.path=="/login")
  {
	console.log(req.path);
	next();
	return;
  }
  if(req.path=="/dashboard")
  {
	console.log(req.path);
	next();
	return;
  }

  var clientToken = req.param(CLIENT_TOKEN_PARAMETER_NAME);
  try
  {
    var userInfo = jwt.decode(clientToken, JWT_SECRET_KEY);

    var where = {'email': userInfo.email, 'google_access_token': userInfo.google_access_token};
    db.retrieveFromWhere('auth', where)
      .onFulfill(function (authorization_record) {
        if (authorization_record.length > 0) {
          console.log(userInfo.email);
          console.log(userInfo.google_access_token);
          //res.json("email",userInfo.email);
          //res.json("google_access_token",userInfo.google_access_token);
          next();
        } else {
          setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
          return;
        }
      })
      .onReject(function (reason){
        console.log(reason);
        setErrorResponse(ERROR_DATABASE_LOOKUP, res);
        return;
      });


    // if(userInfo.email==DB_Profile.email&&userInfo.google_access_token==DB_Profile.google_access_token)
    // {
    //  console.log(userInfo.email);
    //  console.log(userInfo.google_access_token);
    //  //res.json("email",userInfo.email);
    //  //res.json("google_access_token",userInfo.google_access_token);
    //  next();
    // }
    // else
    // {
    //  setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
    //  return;
    // }
  }
  catch (err) {
    // handle the error safely
    console.log(err);
    setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
	return;
  }
};

var loginFn = function(req,res,next)
{
	console.log(req.param(IS_SIGN_OUT_PARAMETER_NAME));
	if(null!=req.param(IS_SIGN_OUT_PARAMETER_NAME)&&"true"==req.param(IS_SIGN_OUT_PARAMETER_NAME))
	{
		console.log("delete session");
		req.session.clientToken=null;
	}
	console.log("in login handle");
	var html_dir = './';
	// routes to serve the static HTML files
	res.status(200).sendfile(html_dir + 'auth.html');
	return;
};

var dashboardFn = function(req,res,next)
{
	console.log("in dashboard handle");
	var clientToken;
	if(req.param(CLIENT_TOKEN_PARAMETER_NAME))
	{
		clientToken = req.param(CLIENT_TOKEN_PARAMETER_NAME);
		console.log(clientToken);
		req.session.clientToken=clientToken;
	}
	if(req.param(IS_REQUEST_CLIENT_TOKEN_PARAMETER_NAME))
	{
		if(req.session.clientToken)
		{
			clientToken=req.session.clientToken;
			res.send(200, clientToken);
			return;
		}
		if(null==clientToken||""==clientToken)
		{
			setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
			console.log("client token is null");
			return;
		}
	}

	var html_dir = './';
	// routes to serve the static HTML files
	res.status(200).sendfile(html_dir + 'dashboard.html');
	return;
};

exports.verifyGoogleToken=verifyGoogleToken;
exports.verifyClientToken=verifyClientToken;
exports.loginFn=loginFn;
exports.dashboardFn=dashboardFn;


