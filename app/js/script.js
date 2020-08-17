$(document).ready(function () {
    $(window).on('beforeunload', function () {
        $(window).scrollTop(0);
    });
    $('.counter').counterUp({
        delay: 50,
        time: 1500
    });

    $('.header__burger').click(function () {
        if (!$('.header-menu').hasClass('active-menu')) {
            $('.header-menu').addClass('active-menu');
            $('.fa-bars').hide();
            $('.fa-times').show();
        } else {
            $('.header-menu').removeClass('active-menu');
            $('.fa-bars').show();
            $('.fa-times').hide();
        }
    });

    let logo = $('.header__logo');
    logo.click(function (e) {
        e.preventDefault();
        $('html').animate({
            scrollTop: 0
        }, 1000);
    });

    $(window).scroll(function () {
        let scroll = $(this).scrollTop();
        let navHeight = $('.header-nav').innerHeight();
        let headerHeight = $('.header').innerHeight();
        if (scroll >= headerHeight - navHeight) {
            $('.header-nav').addClass('nav-bg');
        } else {
            $('.header-nav').removeClass('nav-bg');
        }

        $('.header-menu__link').each(function () {
            let id = $(this).attr('href');
            let position = $(id).offset().top - 150;
            if (scroll >= position) {
                $('.header-menu__item_active').removeClass('header-menu__item_active');
                $(this).parent().addClass('header-menu__item_active');
            }
        });
    });


    $('.header-menu__link').click(function (e) {
        e.preventDefault();
        $('.header-menu__item_active').removeClass('header-menu__item_active');
        $(this).parent().addClass('header-menu__item_active');
        let id = $(this).attr('href');
        let position = $(id).offset().top - $('.header-nav').innerHeight();

        $('html').animate({
            scrollTop: position
        }, 800);
    });


    function filterImg(img) {
        $('.works-gallery__item').filter(img).show();
        $('.works-gallery__item').not(img).hide();
    }
    $('.works-gallery__btn').click(function () {
        filterImg('.' + $(this).attr('data-filter'));
    });

    $('.works-gallery__btn').click(function (e) {
        e.preventDefault();
        if (!$('.works-gallery__btn').hasClass('.works-gallery__btn_active')) {
            $('.works-gallery__btn_active').removeClass('works-gallery__btn_active');
            $(this).addClass('works-gallery__btn_active');
        }
    });



});