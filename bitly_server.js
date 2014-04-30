Bitly = {};

Oauth.registerService('bitly', 2, null, function(query) {

  var accessToken = getAccessToken(query);
  var identity = getIdentity(accessToken);

  return {
    serviceData: {
      id: identity.login,
      accessToken: accessToken,
      username: identity.login,
      fullName: identity.full_name,
      profileImage: identity.profile_image,
      isEnterprise: identity.is_enterprise,
    }
  };
});

var userAgent = "Meteor";
if (Meteor.release)
  userAgent += "/" + Meteor.release;

var getAccessToken = function (query) {
  var config = ServiceConfiguration.configurations.findOne({service: 'bitly'});
  if (!config)
    throw new ServiceConfiguration.ConfigError("Service not configured");

  var response;
  try {
    response = HTTP.post(
      "https://api-ssl.bitly.com/oauth/access_token", {
        headers: {
          Accept: 'application/json',
          "User-Agent": userAgent
        },
        params: {
          code: query.code,
          client_id: config.clientId,
          client_secret: config.secret,
          grant_type: 'authorization_code',
          redirect_uri: Meteor.absoluteUrl("_oauth/bitly?close"),
          state: query.credentialToken
        }
      });
  } catch (err) {
    throw _.extend(new Error("Failed to complete OAuth handshake with Bitly. " + err.message),
                   {response: err.response});
  }
  if (response.data.error) { // if the http response was a json object with an error attribute
    throw new Error("Failed to complete OAuth handshake with Bitly. " + response.data.error);
  } else {
    return response.data.access_token;
  }
};

var getIdentity = function (accessToken) {
  try {
    return HTTP.get(
      "https://api-ssl.bitly.com/v3/user/info", {
        headers: {"User-Agent": userAgent},
        params: {
          access_token: accessToken
        }
      }).response.data;
  } catch (err) {
    throw _.extend(new Error("Failed to fetch identity from Bitly. " + err.message),
                   {response: err.response});
  }
};


Bitly.retrieveCredential = function(credentialToken) {
  return Oauth.retrieveCredential(credentialToken);
};
