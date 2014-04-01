var express = require('express');
var jwt = require('jwt-simple');
var app = express();
// app.use(express.bodyParser()); // this is needed to parse the body of requests like POST and PUT
var everyauth = require('everyauth');
var _ = require('underscore');
var routes = require("./routes");
var googleapis = require('googleapis');
var OAuth2Client = googleapis.OAuth2Client;
var CLIENT_ID = '55000252691-rvdv769veahs88jub2v0s7213p6oom1a.apps.googleusercontent.com';
var CLIENT_SECRET = 'vyujyWl2CU5boee_SQIKtGtP';
var REDIRECT_URL = '';
var AUTH_API_NAME= 'oauth2';
var AUTH_API_VERSION='v2';
var GOOGLE_TOKEN_PARAMETER_NAME='google_access_token';
var CLIENT_TOKEN_PARAMETER_NAME='client_access_token';
var JWT_SECRET_KEY = 'chat.backend';
var profile = {
    email: 'shenli570@gmail.com',
	google_access_token:'ISISISISISIS'
  };
  

function getUserProfile(client, authClient, userId, callback) {
  client
    .oauth2.userinfo.get()
    .withAuthClient(authClient)
    .execute(callback);
}

function setErrorResponse(err,res)
{
	res.statusCode=404;
	return res.json({'An error occured': err});
}

function getJWTToken(profile)
{
	var token = jwt.encode(profile, JWT_SECRET_KEY);
	return token;
}

var verfiyGoogleToken = function (req, res) {
  // options for GET
  var googleToken = req.param(GOOGLE_TOKEN_PARAMETER_NAME);
  
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
				setErrorResponse(err,res);
			}
			else
			{
				//TODO to validate the email here
				console.log(userInfo.email);
				if(userInfo.email==profile.email)
				{
					// updata the google_access_token into the profile
					profile.google_access_token = googleToken;
					// generate JWT token here
					var jwtToken = getJWTToken(profile);
					// return the jwt token to the app
					res.statusCode=200;
					res.json("client_access_token",jwtToken);
				}
			}
		});
	});
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
		if(userInfo.email==profile.email&&userInfo.google_access_token==profile.google_access_token)
		{
			console.log(userInfo.email);
			console.log(userInfo.google_access_token);
			//res.json("email",userInfo.email);
			//res.json("google_access_token",userInfo.google_access_token);
			next();
		}
		else
		{
			res.statusCode=400;
			res.json("the token is invalid");
		}
	}
	catch (err) {
		// handle the error safely
		console.log(err);
		res.statusCode=400;
		res.json("the token is invalid");
	}
};

app.configure(function() {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: "90ndsj9dfdsf"}));
  app.use("/auth",verfiyGoogleToken);
  app.use(verifyClientToken);
  app.use(app.router);
  // app.set('view engine', 'jade');
  // app.use(express.static(__dirname + '/public'));
  // app.use(express.errorHandler());
  // everyauth.helpExpress(app);
});

routes(app);

app.listen(process.env.PORT || 8000);