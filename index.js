var Metalsmith = require('metalsmith');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var fileMetadata = require('metalsmith-filemetadata');
var archive = require('./blog-archive')
var publishdate = require('./publish-date')
var excerpts = require('metalsmith-excerpts');
var publish = require('metalsmith-publish');
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

module.exports = (src,target,publishDate,basedir)=>{

Metalsmith(__dirname)
  .source(src)
  .destination(target)
  .use(publishdate(publishDate))
  .metadata({basedir:basedir})
  .use(fileMetadata([{
    pattern: "blog/**/*.md",
    metadata: {
      layout: "blog-post.html"
    }
  }]))
  .use(publish({
    draft: false
  }))  
  .use(collections({
    blog: {
      pattern: 'blog/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(archive({
    collection: "blog"
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
    partials: 'partials',
    exposeConsolidate: function (requires) {
      requires.handlebars = Handlebars
    }
  }))
  .build(function (err) {
    if (err) throw err;
  });
}
