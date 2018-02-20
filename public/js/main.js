var tabs = (function () {

    return {
        init : function() {

            $('.tabs__controls-link').on('click', function (e) {
                e.preventDefault();
                var
                    item = $(this).closest('.tabs__controls-item'),
                    container = item.closest('.tabs'),
                    contentItems = container.find('.tabs__item'),
                    //index =  item.index(),
                    id = $(this).data('class')
                   // items =  container.find('.tabs__controls-item');

                contentItems.filter('.tabs__item_'+ id)
                    .addClass('active')
                    .siblings()
                    .removeClass('active');

                item
                    .addClass('active')
                    .siblings()
                    .removeClass('active');


            })
        }
    }
}());



//slider
var slider  = (function () {
    var
        flag = true,
        timer = 0,
        timerDuration = 3000;
    return {
        init : function () {
            var _this = this;
            _this.createDots();
            //start auto switch
            _this.autoSwitch();

            $('.slider__controls-button').on('click', function (e) {
                e.preventDefault();
                var $this = $(this),
                    slides = $this.closest('.slider').find('.slider__item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    prevSlide = activeSlide.prev(),
                    firstSlide = slides.first(),
                    lastSlide = slides.last();

                 _this.clearTimer();
                if($this.hasClass('slider__controls-button_next')){
                    if(!nextSlide.length) nextSlide = firstSlide;
                    _this.moveSlide(nextSlide, 'forward');
                }
                else if($('.slider__controls-button').hasClass('slider__controls-button_prev')){
                    if(!prevSlide.length) prevSlide = lastSlide;
                    _this.moveSlide(prevSlide, 'backward');
                }
            });
            $('.slider__dots-link').on('click', function (e) {
                e.preventDefault();
                _this.clearTimer();
                var $this = $(this),
                    dotItmes = $this.closest('.slider_dots').find('.slider__dots-item'),
                    activeDot = dotItmes.filter('.active'),
                    currentDot = $this.closest('.slider__dots-item'),
                    currentDonNumber = currentDot.index(),
                    direction =  activeDot.index() < currentDonNumber ? 'forward' : 'backward',
                    reqSlide =  $this.closest('.slider').find('.slider__item').eq(currentDonNumber);
                _this.moveSlide(reqSlide, direction);

            })
        },
        moveSlide: function (slide, direction) {
            var _this = this,
                container  = slide.closest('.slider'),
                slides = container.find('.slider__item'),
                activeSlide = slides.filter('.active'),
                slideWidth = slides.width(),
                dotsContainer = container.find('.slider_dots'),
                duration = 500,
                reqCssPosion = 0,
                reqSlideStrafe = 0;

            if(direction === 'forward'){
                reqCssPosion = slideWidth,
                reqSlideStrafe = -slideWidth;
            }
            else if(direction === 'backward'){

                reqCssPosion = -slideWidth,
                reqSlideStrafe = slideWidth;
            }
            slide.css('left', reqCssPosion).addClass('inslide');
            var movableSlide = slides.filter('.inslide');

            activeSlide.animate({left:reqSlideStrafe},duration);
            movableSlide.animate({left:0},duration, function () {
                slides.css('left', '0').removeClass('active');
                $(this).toggleClass('inslide active');
                _this.setActiveDots(dotsContainer);
            });

            
        },
        createDots : function () {

            var _this = this,
                container = $('.slider'),
                dotMarkup = '<li class="slider__dots-item">\
                            <a class = "slider__dots-link" href="#">\
                           </a></li> ';
            container.each(function () {
                console.log($(this));
                var $this = $(this),
                    slides = $this.find('.slider__item'),
                    dotsContainer =  $this.find('.slider_dots');
                console.log( slides.length);
                for (i = 0; i < slides.length; i++){
                    dotsContainer.append(dotMarkup);
                }
                _this.setActiveDots(dotsContainer);
            })


        },
        setActiveDots : function (container) {
            var slides = container.closest('.slider__list-wrap').find('.slider__item');
                container
                    .find('.slider__dots-item')
                    .eq(slides.filter('.active').index())
                    .addClass('active')
                    .siblings()
                    .removeClass('active');
        },
        autoSwitch: function () {

            var _this = this;
            timer = setInterval(function () {
                var
                    slides = $('.slider__list .slider__item'),
                    activeSlide = slides.filter('.active'),
                    nextSlide = activeSlide.next(),
                    firstSlide = slides.first();

                if(!nextSlide.length) nextSlide = firstSlide;
                _this.moveSlide(nextSlide, 'forward');

            },timerDuration);
                
        },
        clearTimer: function () {
            if(timer){
                clearInterval(timer);
                this.autoSwitch();
            }
        }
        
    }

}());


var slideshow = (function () {

    var zoomConfig = {}; //cursor: 'crosshair', zoomType: "inner"
    return {

        showSlide : function () {
            $('.slideshow__thumbs-link').on('click', function (e) {

                e.preventDefault();
                var $this = $(this),
                    container = $this.closest('.slideshow'),
                    display = container.find('.slideshow__display-img'),
                    item = $this.closest('.slideshow__thumbs-item'),
                    path = item.attr('href'),

                    duration = 600,
                    preloader = $('.slideshow__preloader');

                ;
                if (!item.hasClass('active')) {
                    preloader.show();
                    display.fadeOut(duration, function () {
                        $('.zoomContainer').remove();
                        display.removeData('elevateZoom');
                        // Update source for images
                        display.attr('src', path);
                        display.data('zoom-image', item.data('zoom-image'));
                        // Reinitialize EZ
                        display.elevateZoom(zoomConfig);
                        $(this).fadeIn(duration);
                        preloader.hide();
                    });

                    item.addClass('active')
                        .siblings()
                        .removeClass('active');
                }

            });
        },
        init: function(){
            var _this = this;
            _this.showSlide();
        }
    }


}());


$(document).ready(function () {

    if($('.slider').length){
        slider.init();
    };
    if($('.tabs').length){
        tabs.init();
    }
    if($('.slideshow').length){
        slideshow.init();
    }
})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB0YWJzID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICQoJy50YWJzX19jb250cm9scy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSAkKHRoaXMpLmNsb3Nlc3QoJy50YWJzX19jb250cm9scy1pdGVtJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gaXRlbS5jbG9zZXN0KCcudGFicycpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRJdGVtcyA9IGNvbnRhaW5lci5maW5kKCcudGFic19faXRlbScpLFxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5kZXggPSAgaXRlbS5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlkID0gJCh0aGlzKS5kYXRhKCdjbGFzcycpXHJcbiAgICAgICAgICAgICAgICAgICAvLyBpdGVtcyA9ICBjb250YWluZXIuZmluZCgnLnRhYnNfX2NvbnRyb2xzLWl0ZW0nKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb250ZW50SXRlbXMuZmlsdGVyKCcudGFic19faXRlbV8nKyBpZClcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGl0ZW1cclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KCkpO1xyXG5cclxuXHJcblxyXG4vL3NsaWRlclxyXG52YXIgc2xpZGVyICA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXJcclxuICAgICAgICBmbGFnID0gdHJ1ZSxcclxuICAgICAgICB0aW1lciA9IDAsXHJcbiAgICAgICAgdGltZXJEdXJhdGlvbiA9IDMwMDA7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLmNyZWF0ZURvdHMoKTtcclxuICAgICAgICAgICAgLy9zdGFydCBhdXRvIHN3aXRjaFxyXG4gICAgICAgICAgICBfdGhpcy5hdXRvU3dpdGNoKCk7XHJcblxyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19jb250cm9scy1idXR0b24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXMgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJykuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RTbGlkZSA9IHNsaWRlcy5sYXN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmKCR0aGlzLmhhc0NsYXNzKCdzbGlkZXJfX2NvbnRyb2xzLWJ1dHRvbl9uZXh0Jykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFuZXh0U2xpZGUubGVuZ3RoKSBuZXh0U2xpZGUgPSBmaXJzdFNsaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1vdmVTbGlkZShuZXh0U2xpZGUsICdmb3J3YXJkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmKCQoJy5zbGlkZXJfX2NvbnRyb2xzLWJ1dHRvbicpLmhhc0NsYXNzKCdzbGlkZXJfX2NvbnRyb2xzLWJ1dHRvbl9wcmV2Jykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKCFwcmV2U2xpZGUubGVuZ3RoKSBwcmV2U2xpZGUgPSBsYXN0U2xpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMubW92ZVNsaWRlKHByZXZTbGlkZSwgJ2JhY2t3YXJkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAkKCcuc2xpZGVyX19kb3RzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXJUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RJdG1lcyA9ICR0aGlzLmNsb3Nlc3QoJy5zbGlkZXJfZG90cycpLmZpbmQoJy5zbGlkZXJfX2RvdHMtaXRlbScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZURvdCA9IGRvdEl0bWVzLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnREb3QgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyX19kb3RzLWl0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG9uTnVtYmVyID0gY3VycmVudERvdC5pbmRleCgpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICBhY3RpdmVEb3QuaW5kZXgoKSA8IGN1cnJlbnREb25OdW1iZXIgPyAnZm9yd2FyZCcgOiAnYmFja3dhcmQnLFxyXG4gICAgICAgICAgICAgICAgICAgIHJlcVNsaWRlID0gICR0aGlzLmNsb3Nlc3QoJy5zbGlkZXInKS5maW5kKCcuc2xpZGVyX19pdGVtJykuZXEoY3VycmVudERvbk51bWJlcik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3ZlU2xpZGUocmVxU2xpZGUsIGRpcmVjdGlvbik7XHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZVNsaWRlOiBmdW5jdGlvbiAoc2xpZGUsIGRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyICA9IHNsaWRlLmNsb3Nlc3QoJy5zbGlkZXInKSxcclxuICAgICAgICAgICAgICAgIHNsaWRlcyA9IGNvbnRhaW5lci5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgIHNsaWRlV2lkdGggPSBzbGlkZXMud2lkdGgoKSxcclxuICAgICAgICAgICAgICAgIGRvdHNDb250YWluZXIgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9kb3RzJyksXHJcbiAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IDUwMCxcclxuICAgICAgICAgICAgICAgIHJlcUNzc1Bvc2lvbiA9IDAsXHJcbiAgICAgICAgICAgICAgICByZXFTbGlkZVN0cmFmZSA9IDA7XHJcblxyXG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09ICdmb3J3YXJkJyl7XHJcbiAgICAgICAgICAgICAgICByZXFDc3NQb3Npb24gPSBzbGlkZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgcmVxU2xpZGVTdHJhZmUgPSAtc2xpZGVXaWR0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PT0gJ2JhY2t3YXJkJyl7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVxQ3NzUG9zaW9uID0gLXNsaWRlV2lkdGgsXHJcbiAgICAgICAgICAgICAgICByZXFTbGlkZVN0cmFmZSA9IHNsaWRlV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2xpZGUuY3NzKCdsZWZ0JywgcmVxQ3NzUG9zaW9uKS5hZGRDbGFzcygnaW5zbGlkZScpO1xyXG4gICAgICAgICAgICB2YXIgbW92YWJsZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLmluc2xpZGUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZVNsaWRlLmFuaW1hdGUoe2xlZnQ6cmVxU2xpZGVTdHJhZmV9LGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgbW92YWJsZVNsaWRlLmFuaW1hdGUoe2xlZnQ6MH0sZHVyYXRpb24sIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNsaWRlcy5jc3MoJ2xlZnQnLCAnMCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2luc2xpZGUgYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3RpdmVEb3RzKGRvdHNDb250YWluZXIpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JlYXRlRG90cyA6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIgPSAkKCcuc2xpZGVyJyksXHJcbiAgICAgICAgICAgICAgICBkb3RNYXJrdXAgPSAnPGxpIGNsYXNzPVwic2xpZGVyX19kb3RzLWl0ZW1cIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3MgPSBcInNsaWRlcl9fZG90cy1saW5rXCIgaHJlZj1cIiNcIj5cXFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+PC9saT4gJztcclxuICAgICAgICAgICAgY29udGFpbmVyLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpLFxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcyA9ICR0aGlzLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBkb3RzQ29udGFpbmVyID0gICR0aGlzLmZpbmQoJy5zbGlkZXJfZG90cycpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIHNsaWRlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgZG90c0NvbnRhaW5lci5hcHBlbmQoZG90TWFya3VwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIF90aGlzLnNldEFjdGl2ZURvdHMoZG90c0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldEFjdGl2ZURvdHMgOiBmdW5jdGlvbiAoY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBjb250YWluZXIuY2xvc2VzdCgnLnNsaWRlcl9fbGlzdC13cmFwJykuZmluZCgnLnNsaWRlcl9faXRlbScpO1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyXHJcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoJy5zbGlkZXJfX2RvdHMtaXRlbScpXHJcbiAgICAgICAgICAgICAgICAgICAgLmVxKHNsaWRlcy5maWx0ZXIoJy5hY3RpdmUnKS5pbmRleCgpKVxyXG4gICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICAuc2libGluZ3MoKVxyXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBhdXRvU3dpdGNoOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhclxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlcyA9ICQoJy5zbGlkZXJfX2xpc3QgLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcignLmFjdGl2ZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IGFjdGl2ZVNsaWRlLm5leHQoKSxcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdFNsaWRlID0gc2xpZGVzLmZpcnN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYoIW5leHRTbGlkZS5sZW5ndGgpIG5leHRTbGlkZSA9IGZpcnN0U2xpZGU7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5tb3ZlU2xpZGUobmV4dFNsaWRlLCAnZm9yd2FyZCcpO1xyXG5cclxuICAgICAgICAgICAgfSx0aW1lckR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xlYXJUaW1lcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZih0aW1lcil7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXV0b1N3aXRjaCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxufSgpKTtcclxuXHJcblxyXG52YXIgc2xpZGVzaG93ID0gKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgem9vbUNvbmZpZyA9IHt9OyAvL2N1cnNvcjogJ2Nyb3NzaGFpcicsIHpvb21UeXBlOiBcImlubmVyXCJcclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIHNob3dTbGlkZSA6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnLnNsaWRlc2hvd19fdGh1bWJzLWxpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlc2hvdycpLFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkgPSBjb250YWluZXIuZmluZCgnLnNsaWRlc2hvd19fZGlzcGxheS1pbWcnKSxcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlc2hvd19fdGh1bWJzLWl0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoID0gaXRlbS5hdHRyKCdocmVmJyksXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRlciA9ICQoJy5zbGlkZXNob3dfX3ByZWxvYWRlcicpO1xyXG5cclxuICAgICAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5oYXNDbGFzcygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkZXIuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXkuZmFkZU91dChkdXJhdGlvbiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcuem9vbUNvbnRhaW5lcicpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5LnJlbW92ZURhdGEoJ2VsZXZhdGVab29tJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzb3VyY2UgZm9yIGltYWdlc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5LmF0dHIoJ3NyYycsIHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5LmRhdGEoJ3pvb20taW1hZ2UnLCBpdGVtLmRhdGEoJ3pvb20taW1hZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlaW5pdGlhbGl6ZSBFWlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5LmVsZXZhdGVab29tKHpvb21Db25maWcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZhZGVJbihkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWxvYWRlci5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgICAgIF90aGlzLnNob3dTbGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KCkpO1xyXG5cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICBpZigkKCcuc2xpZGVyJykubGVuZ3RoKXtcclxuICAgICAgICBzbGlkZXIuaW5pdCgpO1xyXG4gICAgfTtcclxuICAgIGlmKCQoJy50YWJzJykubGVuZ3RoKXtcclxuICAgICAgICB0YWJzLmluaXQoKTtcclxuICAgIH1cclxuICAgIGlmKCQoJy5zbGlkZXNob3cnKS5sZW5ndGgpe1xyXG4gICAgICAgIHNsaWRlc2hvdy5pbml0KCk7XHJcbiAgICB9XHJcbn0pIl19
