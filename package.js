Package.describe({
  summary: "Bitly OAuth flow",
  internal: true
});

Package.on_use(function (api, where) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.export('Bitly');

  api.add_files(['bitly_configure.html', 'bitly_configure.js'], 'client');
  api.add_files('bitly_server.js', 'server');
  api.add_files('bitly_client.js', 'client');
});

//Package.on_test(function (api) {
//  api.use('meteor-bitly');

//  api.add_files('meteor-bitly_tests.js', ['client', 'server']);
//});
