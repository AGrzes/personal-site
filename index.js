var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var fileMetadata = require('metalsmith-filemetadata');
var summary = require('./collection-summary')
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
    perPage: 10,
    collection: "blog",
    layout: 'blog-page.html'
  }))
  .use(markdown())
  .use(layouts({
    engine: 'handlebars',
    default: 'default.html',
    exposeConsolidate: function (requires) {
      requires.handlebars = Handlebars
    }
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
