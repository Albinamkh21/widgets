'use strict';

module.exports = function() {
    $.gulp.task('sass', function() {
        return $.gulp.src('./css/main.scss')
            .pipe($.gp.sourcemaps.init())
            .pipe($.gp.sassGlob())
            .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
            .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
            .pipe($.gp.cssUnit({
                type     :    'px-to-rem',
                rootSize :    16
            }))
            .pipe($.gp.sourcemaps.write())
            .pipe($.gulp.dest($.config.root + '/css'))
            .pipe($.browserSync.stream());
    })
};
