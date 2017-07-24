var _ = require('lodash')
var moment = require('moment')
module.exports = (opts) => {
  return (files, metalsmith, done) => {
    var metadata = metalsmith.metadata()
    var collection = metadata.collections[opts.collection]
    var archive = _.mapValues(_.groupBy(collection, (page) => moment(page.date).format('YYYY')), (items) => _.mapValues(_.groupBy(items, (page) => moment(page.date).format('MM')), (items) => _.groupBy(items, (page) => moment(page.date).format('DD'))))
    archive = _.map(archive, (items, year) => ({
      title: year,
      layout: 'archive-year.html',
      contents: '',
      permalink:false,
      months: _(items).map((items, month) => ({
        title: month,
        layout: 'archive-month.html',
        contents: '',
        permalink:false,
        days: _(items).map((items, day) => ({
          title: day,
          layout: 'archive-day.html',
          pages: items,
          permalink:false,
          contents: ''
        })).sortBy('title').value()
      })).sortBy('title').value()
    }))
    _.forEach(archive, (year) => {
      files[`${opts.collection}/${year.title}/index.html`] = year
      _.forEach(year.months, (month) => {
        files[`${opts.collection}/${year.title}/${month.title}/index.html`] = month
        _.forEach(month.days, (day) => {
          files[`${opts.collection}/${year.title}/${month.title}/${day.title}/index.html`] = day
        })
      })
    })
    done()
  }
}