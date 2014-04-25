var jwt = require('jwt-simple');
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var CLIENT_ID = '55000252691-rvdv769veahs88jub2v0s7213p6oom1a.apps.googleusercontent.com';
var CLIENT_SECRET = 'vyujyWl2CU5boee_SQIKtGtP';
var AUTH_API_NAME= 'oauth2';
var AUTH_API_VERSION='v2';
var GOOGLE_TOKEN_PARAMETER_NAME='google_access_token';
var CLIENT_TOKEN_PARAMETER_NAME='client_access_token';
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
	res.statusCode=404;
	return res.json(err);
}

function getJWTToken(profile)
{
	var token = jwt.encode(profile, JWT_SECRET_KEY);
	return token;
}


var verfiyGoogleToken = function (req, res) {
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
		// 	console.log(userInfo.email);
		// 	console.log(userInfo.google_access_token);
		// 	//res.json("email",userInfo.email);
		// 	//res.json("google_access_token",userInfo.google_access_token);
		// 	next();
		// }
		// else
		// {
		// 	setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
		// 	return;
		// }
	}
	catch (err) {
		// handle the error safely
		console.log(err);
		setErrorResponse(ERROR_CLIENT_TOKEN_NOT_VALID,res);
	}
};

exports.verfiyGoogleToken=verfiyGoogleToken;
exports.verifyClientToken=verifyClientToken;



