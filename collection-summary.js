var _ = require('lodash')
module.exports = (opts) => {
  return (files, metalsmith, done) => {
    var metadata = metalsmith.metadata()
    var collection = metadata.collections[opts.collection]
    files[`${opts.collection}/index.html`] = Object.assign({}, opts, {
      contents: '',
      items: collection
    })
    done()
  }
}
