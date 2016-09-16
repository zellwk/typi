var mocha = require('mocha');
var path = require('path');
var sassTrue = require('sass-true');

const testFiles = [
  'test',
  'extender',
]

testFiles.forEach(basename => {
  var testFile = path.join(__dirname, `${basename}.scss`);
  sassTrue.runSass({file: testFile}, describe, it);
})
