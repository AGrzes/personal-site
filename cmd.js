#!/usr/bin/env node
var src = process.env.SITE_SRC||'src'
var target = process.env.SITE_TARGET||`${__dirname}/target/`
var publishDate = process.env.SITE_PUBLISH_DATE
var basedir =  process.env.BASEDIR||target
require('./index')(src,target,publishDate,basedir)
