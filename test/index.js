'use strict'

var fs = require('fs')
var path = require('path')
var wf = require('run-waterfall')
var tape = require('tape')
var parser = require('../')

var LOCKFILE = path.resolve(__dirname, '..', 'yarn.lock')

tape('parsing', function (t) {
  t.plan(1)
  wf([
    function readLockFile (cb) {
      fs.readFile(LOCKFILE, cb)
    },
    function stringify (buffer, cb) {
      cb(null, buffer.toString())
    },
    parser.parse.bind(parser)
  ], function (err, parsed) {
    if (err) return t.fail(err)
    t.ok(parsed)
    console.log(JSON.stringify(parsed, null, 2))
    t.end()
  })
})
