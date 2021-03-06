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