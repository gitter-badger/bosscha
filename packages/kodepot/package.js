Package.describe({
    summary: 'Kodepot NPM container',
    version: '0.1.0',
    name: 'kodepot:container'
});

Npm.depends({
    "marked": "0.3.5",
    "highlight.js": "9.1.0",
    "diff": "2.2.1",
    "sweetalert": "1.1.3"
});

Package.onUse(function(api) {
    api.versionsFrom('1.0');

    api.use('cosmos:browserify@0.9.3', 'client')

    api.addFiles('index.js', 'server');
    api.addFiles('index.browserify.js', 'client');

    api.export('marked');
    api.export('highlight');
    api.export('diff');
});
