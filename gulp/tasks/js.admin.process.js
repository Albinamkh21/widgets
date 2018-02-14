'use strict';
module.exports = function() {
    $.gulp.task('js:admin.process', function() {
        return $.gulp.src('./resources/assets/js/admin/admin.js')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.concat('admin.js'))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/pink/js/'))
    })
};
