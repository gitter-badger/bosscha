Package.describe({
  summary: 'Kodepot NPM container',
  version: '0.1.0',
  name: 'kodepot:container'
});

Npm.depends({
  "highlight.js": "9.1.0",
  "hashids": "1.0.2",
  "sanitize-html": "1.11.3"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('cosmos:browserify@0.9.3', 'client');

  api.addFiles('index.js', 'server');
  api.addFiles('index.browserify.js', 'client');

  api.export('hljs', 'server'); // hljs for client will be handled by `bower`
  api.export('huid', 'server');
  api.export('Kodepot', 'server');
  api.export('sanitizeHtml', ['server', 'client']);
});
