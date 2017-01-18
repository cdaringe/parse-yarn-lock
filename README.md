# parse-yarn-lock

parse a `yarn.lock` file, using the globally installed `yarn`.

## install

`yarn add parse-yarn-lock`, or `npm install parse-yarn-lock`

## usage

```js
var parser = require('parse-yarn-lock')
var lockfile = fs.readFileSync('yarn.lock').toString()
parser.parse(lockfile, function (err, parsed) {
  if (err) throw err
  console.log(parsed)
  /*
  {
    "balanced-match@^0.4.1": {
      "version": "0.4.2",
      "resolved": "https://registry.yarnpkg.com/balanced-match/-/balanced-match-0.4.2.tgz#cb3f3e3c732dc0f01ee70b403f302e61d7709838"
    },
    "brace-expansion@^1.0.0": {
      "version": "1.1.6",
      "resolved": "https://registry.yarnpkg.com/brace-expansion/-/brace-expansion-1.1.6.tgz#7197d7eaa9b87e648390ea61fc66c84427420df9",
      "dependencies": ...
    ...
  }
  */
})
```
