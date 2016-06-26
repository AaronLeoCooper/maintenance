var path = require('path');
var del = require('del');
var gulp = require('gulp');
var util = require('gulp-util');
var runSequence = require('run-sequence');

// set variable via: gulp --type=production
var environment = util.env.type || 'development';
var isProduction = environment === 'production' || environment === 'prod';

console.log('Building for: ' + environment);

var root = path.join(__dirname + '/');
var dev = root + 'app/';
var dist = root + 'public/';
var gulpTasks = root + 'gulp/';

// Task imports
var Stylus = require(gulpTasks + 'styl.js');
var Copy = require(gulpTasks + 'copy.js');
var Pug = require(gulpTasks + 'pug.js');

// Folders
var folders = {
  stylus:          [dev + 'styles',               dist + 'styles'],
  scripts:         [dev + 'scripts',              dist + 'scripts'],
  images:          [dev + 'images',               dist + 'images'],
  pug:             [dev + '',                     dist + '']
};

// Styl
Stylus(gulp, {
  task: 'styl',
  entry: '/app.styl',
  paths: folders.stylus,
  production: isProduction
});

// Images
Copy(gulp, {
  task: 'images',
  entry: '/**/*',
  paths: folders.images,
  production: isProduction
});

// Pug
Pug(gulp, {
  task: 'pug',
  entry: '/*.pug',
  paths: folders.pug,
  locals: {
    production: isProduction
  },
  production: isProduction
});

gulp.task('clean', function (cb) {
  return del([dist], { force: true }, cb);
});

gulp.task('watch', function () {
  gulp.watch(folders.stylus[0] +          '/**/*.styl', ['styl']);
  gulp.watch(folders.images[0] +          '/**/*', ['images']);
  gulp.watch(folders.pug[0] +             '/*.pug', ['pug']);
});


// WATCH - Clean, build (development), watch
gulp.task('default', ['clean'], function (cb) {
  runSequence(['pug', 'styl', 'images'], 'watch', cb);
});

// BUILD - Clean, build (production)
gulp.task('build', ['clean'], function (cb) {
  runSequence(['pug', 'styl', 'images'], cb);
});
