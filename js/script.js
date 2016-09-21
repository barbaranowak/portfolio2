$(function() {

    $('a').click(function(event) {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, "slow", "swing");
        event.preventDefault();
    });


    const stickyNavTop = $('#nav').offset().top;

    const stickyNav = function() {
        const scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('#nav').addClass('sticky');
        } else {
            $('#nav').removeClass('sticky');
        }
    };

    stickyNav();

    $(window).scroll(function() {
        stickyNav();
    });


    function _btnMenuInit() {
        const $nav = $("#nav");

        $("#btn").on("click", function(e) {
            e.preventDefault();
            $nav.toggleClass("hidden-nav");
        });
    }


    function _showNav() {
        const $nav = $("#nav");
        $nav.removeClass("hidden-nav");
    }

    function _hideNav() {
        const $nav = $("#nav");
        $nav.addClass("hidden-nav");
    }

    function _showBtn() {
        const $button = $("#btn");
        $button.removeClass("hidden-btn");
    }

    function _hideBtn() {
        const $button = $("#btn");
        $button.addClass("hidden-btn");
    }

    function test_match_media_with_listener() {
        const mq = window.matchMedia("(max-width: 600px)");
        mq.addListener(WidthChange);
        WidthChange(mq);
        // media query change
        function WidthChange(mediaQuery) {
            if (mediaQuery.matches) {
                console.log('yes');
                _hideNav();
                _showBtn();
            } else {
                console.log('no');
                _showNav();
                _hideBtn();
            }
        }
    }
    //test_match_media_with_listener();

    $(document).ready(function() {

        _btnMenuInit();
        test_match_media_with_listener();
    });


    (function($, window, document, undefined) {

        $.fn.sss = function(options) {

            // Options

            var settings = $.extend({
                slideShow: true,
                startOn: 0,
                speed: 3500,
                transition: 400,
                arrows: true
            }, options);

            return this.each(function() {

                // Variables

                var
                    wrapper = $(this),
                    slides = wrapper.children().wrapAll('<div class="sss"/>').addClass('ssslide'),
                    slider = wrapper.find('.sss'),
                    slide_count = slides.length,
                    transition = settings.transition,
                    starting_slide = settings.startOn,
                    target = starting_slide > slide_count - 1 ? 0 : starting_slide,
                    animating = false,
                    clicked,
                    timer,
                    key,
                    prev,
                    next,

                    // Reset Slideshow

                    reset_timer = settings.slideShow ? function() {
                        clearTimeout(timer);
                        timer = setTimeout(next_slide, settings.speed);
                    } : $.noop;

                // Animate Slider

                function get_height(target) {
                    return ((slides.eq(target).height() / slider.width()) * 100) + '%';
                }

                function animate_slide(target) {
                    if (!animating) {
                        animating = true;
                        var target_slide = slides.eq(target);

                        target_slide.fadeIn(transition);
                        slides.not(target_slide).fadeOut(transition);

                        slider.animate({
                            paddingBottom: get_height(target)
                        }, transition, function() {
                            animating = false;
                        });

                        reset_timer();

                    }
                };

                // Next Slide

                function next_slide() {
                    target = target === slide_count - 1 ? 0 : target + 1;
                    animate_slide(target);
                }

                // Prev Slide

                function prev_slide() {
                    target = target === 0 ? slide_count - 1 : target - 1;
                    animate_slide(target);
                }

                if (settings.arrows) {
                    slider.append('<div class="sssprev"/>', '<div class="sssnext"/>');
                }

                next = slider.find('.sssnext'),
                    prev = slider.find('.sssprev');

                $(window).load(function() {

                    slider.css({
                        paddingBottom: get_height(target)
                    }).click(function(e) {
                        clicked = $(e.target);
                        if (clicked.is(next)) {
                            next_slide()
                        } else if (clicked.is(prev)) {
                            prev_slide()
                        }                    });

                    animate_slide(target);

                    $(document).keydown(function(e) {
                        key = e.keyCode;
                        if (key === 39) {
                            next_slide()
                        } else if (key === 37) {
                            prev_slide()
                        }
                    });

                });
                // End

            });

        };
    })(jQuery, window, document);



});
