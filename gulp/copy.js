var $ = require('gulp-load-plugins')();
var _util = require('./_util.js');

var defaults = {
  title: null,
  task: 'copy',
  entry: '../' + _util.paths.dev + '/**/*',
  paths: ['../' + _util.paths.dev, '../' + _util.paths.dist],
  production: false
};

module.exports = function (gulp, opts) {
  var o = _util.buildOpts(defaults, opts);

  gulp.task(o.task, function (cb) {
    return gulp.src(o.entry)
      .pipe(!o.production ? $.plumber() : $.util.noop())
      .pipe(gulp.dest(o.paths[1]))
      .pipe($.size({ title: o.title || o.task }));
  });
};
