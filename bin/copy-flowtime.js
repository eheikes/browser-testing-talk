var cpr = require('cpr');
var globSync = require('glob').sync;
var path = require('path');

var files = {
  css: [
    'assets/css/prism.css',
    'assets/css/reset.css',
    'css/flowtime.css',
    'css/themes/default.css',
  ],
  fonts: globSync('assets/fonts/*', { cwd: 'node_modules/Flowtime.js/' }),
  js: [
    'assets/js/prism.js',
    'js/flowtime.min.js',
  ]
};

for (var destFolder in files) {
  for (var i = 0; i < files[destFolder].length; i++) {
    var source = 'node_modules/Flowtime.js/' + files[destFolder][i];
    var dest = 'dist/' + path.dirname(files[destFolder][i]);
    console.log('Copying ' + source + ' to ' + dest);
    cpr(source, dest, { overwrite: true }, function(err, files) {
      if (err) {
        console.error('Error:', err.message);
        process.exit(1);
      }
    });
  }
}
