var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var fileMetadata = require('metalsmith-filemetadata');
var summary = require('./collection-summary')
var excerpts = require('metalsmith-excerpts');
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

Metalsmith(__dirname)
  .source('src')
  .destination('target')
  .use(fileMetadata([{
    pattern: "blog/**/*.md",
    metadata: {
      layout: "blog-post.html"
    }
  }]))
  .use(collections({
    blog: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(summary({
    collection: "blog",
    layout: 'blog-cards.html',
    basedir: '../'
  }))
  .use(markdown())
  .use(excerpts())
  .use(permalinks({
    pattern: ':title',
    linksets: [{
      match: {
        collection: 'blog'
      },
      pattern: 'blog/:date/:title',
    }]
  }))  
  .use(layouts({
    engine: 'handlebars',
    default: 'default.html',
    exposeConsolidate: function (requires) {
      requires.handlebars = Handlebars
    }
  }))
  .build(function (err) {
    if (err) throw err;
  });
