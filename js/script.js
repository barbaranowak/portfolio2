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




});
