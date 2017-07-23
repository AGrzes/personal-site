var _ = require('lodash')
module.exports = (opts) => {
  opts.perPage = opts.perPage || 10


  return (files, metalsmith, done) => {
    var metadata = metalsmith.metadata()
    var collection = metadata.collections[opts.collection]
    var pages = _.chunk(collection, opts.perPage)
    pages.forEach((page, index) => {
      files[`${opts.collection}/page/${index}/index.html`] = Object.assign({}, opts, {
        contents: '',
        items: page
      })
    })
    done()
  }
}
