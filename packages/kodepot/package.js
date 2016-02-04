Package.describe({
  summary: 'Kodepot NPM container',
  version: '0.1.0',
  name: 'kodepot:container'
});

Npm.depends({
  "highlight.js": "9.1.0",
  "hashids": "1.0.2"
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.addFiles('index.js', 'server');

  api.export('hljs', 'server'); // hljs for client will be handled by `bower`
  api.export('huid', 'server');
  api.export('Kodepot', 'server');
});
