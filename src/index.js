var which = require('which')
var fs = require('fs')
var wf = require('run-waterfall')
var path = require('path')

module.exports = {
  parse: function (lockfile, cb) {
    return wf([
      this.getGlobalYarnPath,
      this.getGlobalYarnParser,
      function bindLockfileToParser (parser, cb) {
        return cb(null, parser(lockfile))
      }
    ], cb)
  },
  getGlobalYarnPath: function (cb) {
    return which('yarn', function (err, resolvedPath) {
      if (err) throw err
      return fs.realpath(resolvedPath, cb)
    })
  },
  getGlobalYarnParser: function(yarnPath, cb) {
    // <yarn>/bin/yarn ==> (src) <yarn>/src/lockfile
    //                     (compiled) <yar>lib/node_modules/yarn/lib/lockfile/parse.js
    var parser = require(path.resolve(yarnPath, '../../lib/lockfile/parse.js'))
    return cb(null, parser.default)
  }
}
