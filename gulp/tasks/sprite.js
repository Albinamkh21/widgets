'use strict';

module.exports = function() {
    $.gulp.task('sprite', function() {
        var spriteData =  $.gulp.src('./source/spriteIcons/*.*')
            .pipe($.gp.spritesmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.scss',
                    padding: 5
                }));
        var imgStream  =  spriteData.img.pipe($.gulp.dest('./source/images/'));
        var cssStream  =  spriteData.css.pipe($.gulp.dest('./source/style/common/'));
        return $.merge(imgStream, cssStream);

    })
};

