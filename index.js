var Metalsmith  = require('metalsmith');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');

Metalsmith(__dirname)
  .source('src')
  .destination('target')
  .use(markdown())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function (err) {
    if (err) throw err;
  });
