var mocha = require('mocha')
var path = require('path')
var sassTrue = require('sass-true')

const testFiles = [
  'test',
  'extender'
]

testFiles.forEach(basename => {
  var testFile = path.join(__dirname, 'automated', `${basename}.scss`)
  sassTrue.runSass({
    file: testFile,
    includePaths: [
      './bower_components',
      './node_modules'
    ]
  }, describe, it)
})
