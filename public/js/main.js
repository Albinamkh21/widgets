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

$(document).ready(function () {

    if($('.slider').length){
        slider.init();
    };
    if($('.tabs').length){
        tabs.init();
    }


})
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdGFicyA9IChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0IDogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcudGFic19fY29udHJvbHMtbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gJCh0aGlzKS5jbG9zZXN0KCcudGFic19fY29udHJvbHMtaXRlbScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lciA9IGl0ZW0uY2xvc2VzdCgnLnRhYnMnKSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50SXRlbXMgPSBjb250YWluZXIuZmluZCgnLnRhYnNfX2l0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICAvL2luZGV4ID0gIGl0ZW0uaW5kZXgoKSxcclxuICAgICAgICAgICAgICAgICAgICBpZCA9ICQodGhpcykuZGF0YSgnY2xhc3MnKVxyXG4gICAgICAgICAgICAgICAgICAgLy8gaXRlbXMgPSAgY29udGFpbmVyLmZpbmQoJy50YWJzX19jb250cm9scy1pdGVtJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29udGVudEl0ZW1zLmZpbHRlcignLnRhYnNfX2l0ZW1fJysgaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpdGVtXHJcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zaWJsaW5ncygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcblxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSgpKTtcclxuXHJcblxyXG5cclxuLy9zbGlkZXJcclxudmFyIHNsaWRlciAgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyXHJcbiAgICAgICAgZmxhZyA9IHRydWUsXHJcbiAgICAgICAgdGltZXIgPSAwLFxyXG4gICAgICAgIHRpbWVyRHVyYXRpb24gPSAzMDAwO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBpbml0IDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgICAgICBfdGhpcy5jcmVhdGVEb3RzKCk7XHJcbiAgICAgICAgICAgIC8vc3RhcnQgYXV0byBzd2l0Y2hcclxuICAgICAgICAgICAgX3RoaXMuYXV0b1N3aXRjaCgpO1xyXG5cclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fY29udHJvbHMtYnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcicpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldigpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0U2xpZGUgPSBzbGlkZXMuZmlyc3QoKSxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0U2xpZGUgPSBzbGlkZXMubGFzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICBfdGhpcy5jbGVhclRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZigkdGhpcy5oYXNDbGFzcygnc2xpZGVyX19jb250cm9scy1idXR0b25fbmV4dCcpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighbmV4dFNsaWRlLmxlbmd0aCkgbmV4dFNsaWRlID0gZmlyc3RTbGlkZTtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5tb3ZlU2xpZGUobmV4dFNsaWRlLCAnZm9yd2FyZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZigkKCcuc2xpZGVyX19jb250cm9scy1idXR0b24nKS5oYXNDbGFzcygnc2xpZGVyX19jb250cm9scy1idXR0b25fcHJldicpKXtcclxuICAgICAgICAgICAgICAgICAgICBpZighcHJldlNsaWRlLmxlbmd0aCkgcHJldlNsaWRlID0gbGFzdFNsaWRlO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm1vdmVTbGlkZShwcmV2U2xpZGUsICdiYWNrd2FyZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJCgnLnNsaWRlcl9fZG90cy1saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyksXHJcbiAgICAgICAgICAgICAgICAgICAgZG90SXRtZXMgPSAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyX2RvdHMnKS5maW5kKCcuc2xpZGVyX19kb3RzLWl0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVEb3QgPSBkb3RJdG1lcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50RG90ID0gJHRoaXMuY2xvc2VzdCgnLnNsaWRlcl9fZG90cy1pdGVtJyksXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudERvbk51bWJlciA9IGN1cnJlbnREb3QuaW5kZXgoKSxcclxuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAgYWN0aXZlRG90LmluZGV4KCkgPCBjdXJyZW50RG9uTnVtYmVyID8gJ2ZvcndhcmQnIDogJ2JhY2t3YXJkJyxcclxuICAgICAgICAgICAgICAgICAgICByZXFTbGlkZSA9ICAkdGhpcy5jbG9zZXN0KCcuc2xpZGVyJykuZmluZCgnLnNsaWRlcl9faXRlbScpLmVxKGN1cnJlbnREb25OdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW92ZVNsaWRlKHJlcVNsaWRlLCBkaXJlY3Rpb24pO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmVTbGlkZTogZnVuY3Rpb24gKHNsaWRlLCBkaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lciAgPSBzbGlkZS5jbG9zZXN0KCcuc2xpZGVyJyksXHJcbiAgICAgICAgICAgICAgICBzbGlkZXMgPSBjb250YWluZXIuZmluZCgnLnNsaWRlcl9faXRlbScpLFxyXG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKCcuYWN0aXZlJyksXHJcbiAgICAgICAgICAgICAgICBzbGlkZVdpZHRoID0gc2xpZGVzLndpZHRoKCksXHJcbiAgICAgICAgICAgICAgICBkb3RzQ29udGFpbmVyID0gY29udGFpbmVyLmZpbmQoJy5zbGlkZXJfZG90cycpLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb24gPSA1MDAsXHJcbiAgICAgICAgICAgICAgICByZXFDc3NQb3Npb24gPSAwLFxyXG4gICAgICAgICAgICAgICAgcmVxU2xpZGVTdHJhZmUgPSAwO1xyXG5cclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnZm9yd2FyZCcpe1xyXG4gICAgICAgICAgICAgICAgcmVxQ3NzUG9zaW9uID0gc2xpZGVXaWR0aCxcclxuICAgICAgICAgICAgICAgIHJlcVNsaWRlU3RyYWZlID0gLXNsaWRlV2lkdGg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZihkaXJlY3Rpb24gPT09ICdiYWNrd2FyZCcpe1xyXG5cclxuICAgICAgICAgICAgICAgIHJlcUNzc1Bvc2lvbiA9IC1zbGlkZVdpZHRoLFxyXG4gICAgICAgICAgICAgICAgcmVxU2xpZGVTdHJhZmUgPSBzbGlkZVdpZHRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNsaWRlLmNzcygnbGVmdCcsIHJlcUNzc1Bvc2lvbikuYWRkQ2xhc3MoJ2luc2xpZGUnKTtcclxuICAgICAgICAgICAgdmFyIG1vdmFibGVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5pbnNsaWRlJyk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVTbGlkZS5hbmltYXRlKHtsZWZ0OnJlcVNsaWRlU3RyYWZlfSxkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIG1vdmFibGVTbGlkZS5hbmltYXRlKHtsZWZ0OjB9LGR1cmF0aW9uLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzbGlkZXMuY3NzKCdsZWZ0JywgJzAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdpbnNsaWRlIGFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuc2V0QWN0aXZlRG90cyhkb3RzQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyZWF0ZURvdHMgOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLFxyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyID0gJCgnLnNsaWRlcicpLFxyXG4gICAgICAgICAgICAgICAgZG90TWFya3VwID0gJzxsaSBjbGFzcz1cInNsaWRlcl9fZG90cy1pdGVtXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzID0gXCJzbGlkZXJfX2RvdHMtbGlua1wiIGhyZWY9XCIjXCI+XFxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPjwvbGk+ICc7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKSxcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXMgPSAkdGhpcy5maW5kKCcuc2xpZGVyX19pdGVtJyksXHJcbiAgICAgICAgICAgICAgICAgICAgZG90c0NvbnRhaW5lciA9ICAkdGhpcy5maW5kKCcuc2xpZGVyX2RvdHMnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBzbGlkZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvdHNDb250YWluZXIuYXBwZW5kKGRvdE1hcmt1cCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5zZXRBY3RpdmVEb3RzKGRvdHNDb250YWluZXIpO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXRBY3RpdmVEb3RzIDogZnVuY3Rpb24gKGNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB2YXIgc2xpZGVzID0gY29udGFpbmVyLmNsb3Nlc3QoJy5zbGlkZXJfX2xpc3Qtd3JhcCcpLmZpbmQoJy5zbGlkZXJfX2l0ZW0nKTtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lclxyXG4gICAgICAgICAgICAgICAgICAgIC5maW5kKCcuc2xpZGVyX19kb3RzLWl0ZW0nKVxyXG4gICAgICAgICAgICAgICAgICAgIC5lcShzbGlkZXMuZmlsdGVyKCcuYWN0aXZlJykuaW5kZXgoKSlcclxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNpYmxpbmdzKClcclxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYXV0b1N3aXRjaDogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcclxuICAgICAgICAgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXJcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXMgPSAkKCcuc2xpZGVyX19saXN0IC5zbGlkZXJfX2l0ZW0nKSxcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoJy5hY3RpdmUnKSxcclxuICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCksXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RTbGlkZSA9IHNsaWRlcy5maXJzdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKCFuZXh0U2xpZGUubGVuZ3RoKSBuZXh0U2xpZGUgPSBmaXJzdFNsaWRlO1xyXG4gICAgICAgICAgICAgICAgX3RoaXMubW92ZVNsaWRlKG5leHRTbGlkZSwgJ2ZvcndhcmQnKTtcclxuXHJcbiAgICAgICAgICAgIH0sdGltZXJEdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNsZWFyVGltZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYodGltZXIpe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmF1dG9Td2l0Y2goKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbn0oKSk7XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgaWYoJCgnLnNsaWRlcicpLmxlbmd0aCl7XHJcbiAgICAgICAgc2xpZGVyLmluaXQoKTtcclxuICAgIH07XHJcbiAgICBpZigkKCcudGFicycpLmxlbmd0aCl7XHJcbiAgICAgICAgdGFicy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG5cclxufSkiXX0=
