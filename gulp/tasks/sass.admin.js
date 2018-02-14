'use strict';

module.exports = function() {
    $.gulp.task('sass.admin', function() {
        return $.gulp.src('./resources/assets/sass/admin/admin.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sassGlob())
            .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
           // .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
            .pipe($.gp.cssUnit({
                type     :    'px-to-rem',
                rootSize :    16
            }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/pink/css/'))
            .pipe($.browserSync.stream());
    })
};
