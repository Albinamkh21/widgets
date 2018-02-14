'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./css/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./pug/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./source/images/**/*.*', $.gulp.series('copy:image'));
  });
};
