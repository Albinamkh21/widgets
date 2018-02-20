'use strict';

global.$ = {
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  merge : require('merge-stream'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')({  pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*']})
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});
/*
$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'sass.admin',
    'pug',
    'js:foundation',
    'js:process',
    'copy:image',
    'css:foundation',
    'sprite:svg',
     'copy:files'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
*/

$.gulp.task('default', $.gulp.series(

  $.gulp.parallel(

    'sass',
    'pug',
    'js:process',
    'js:foundation'



  ),

  $.gulp.parallel(
    'watch',
    'serve'
  )

));
