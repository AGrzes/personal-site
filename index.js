var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .source('src')
  .destination('target')
  .use(collections({ 
    blog: 'blog/**/*.md'
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(permalinks({
    pattern: ':title',
    linksets: [{
      match: {
        collection: 'blog'
      },
      pattern: 'blog/:date/:title',
    }]
  }))
  .build(function (err) {
    if (err) throw err;
  });
