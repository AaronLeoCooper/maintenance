var $ = require('gulp-load-plugins')();
var _util = require('./_util.js');

var defaults = {
  title: null,
  task: 'styl',
  entry: '../' + _util.paths.dev + '/styles/app.styl',
  paths: ['../' + _util.paths.dev + '/styles', '../' + _util.paths.dist + '/styles'],
  production: false,
  autoprefixerBrowsers: [
    'ie >= 9', 'ie_mob >= 10', 'ff >= 30', 'chrome >= 34', 'safari >= 6',
    'opera >= 23', 'ios >= 6', 'android >= 4.4', 'bb >= 10'
  ],
  locals: {}
};

module.exports = function (gulp, opts) {
  var o = _util.buildOpts(defaults, opts);
  var stylusOpts = {
    compress: o.production,
    'include css': true,
    define: o.locals
  };

  gulp.task(o.task, function (cb) {
    return gulp.src(o.entry)
      .pipe(!o.production ? $.plumber() : $.util.noop())
      .pipe($.stylus(stylusOpts))
      .pipe($.autoprefixer({ browsers: o.autoprefixerBrowsers }))
      .pipe(gulp.dest(o.paths[1]))
      .pipe($.size({ title: o.title || o.task }));
  });
};
