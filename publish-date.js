var _ = require('lodash')
var moment = require('moment')
module.exports = (cutoff) => {
  cutoff = moment(cutoff)
  return (files, metalsmith, done) => {
    for (key in files){
      if (files[key].date && cutoff.isBefore(files[key].date)){
        delete files[key]
      }
    }
    done()
  }
}
