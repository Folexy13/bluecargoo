!(function (e) {
  "use strict";
  e(window).on("load", function () {
    e("#ctn-preloader").addClass("loaded"),
      e("#loading").fadeOut(500),
      e("#ctn-preloader").hasClass("loaded") &&
        e("#preloader")
          .delay(900)
          .queue(function () {
            e(this).remove();
          }),
      new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !1,
        live: !0,
      }).init(),
      (function () {
        var o = e(".slider-active");
        function i(o) {
          var i =
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
          o.each(function () {
            var o = e(this),
              s = o.data("delay"),
              t = "animated " + o.data("animation");
            o.css({ "animation-delay": s, "-webkit-animation-delay": s }),
              o.addClass(t).one(i, function () {
                o.removeClass(t);
              });
          });
        }
        o.on("init", function (o, s) {
          i(e(".single-slider:first-child").find("[data-animation]"));
        }),
          o.on("beforeChange", function (o, s, t, n) {
            i(
              e('.single-slider[data-slick-index="' + n + '"]').find(
                "[data-animation]"
              )
            );
          }),
          o.slick({
            autoplay: !0,
            autoplaySpeed: 6e3,
            dots: !1,
            fade: !0,
            arrows: !1,
            responsive: [
              { breakpoint: 767, settings: { dots: !1, arrows: !1 } },
            ],
          });
      })(),
      e(".count").counterUp({ delay: 10, time: 2e3 });
  }),
    e("#mobile-menu").meanmenu({
      meanMenuContainer: ".mobile-menu",
      meanScreenWidth: "992",
    }),
    e(window).on("scroll", function () {
      e(window).scrollTop() < 245
        ? e("#header-sticky").removeClass("sticky-menu")
        : e("#header-sticky").addClass("sticky-menu");
    }),
    e(function () {
      e("a.icon-scroll").on("click", function (o) {
        var i = e(this);
        e("html, body")
          .stop()
          .animate({ scrollTop: e(i.attr("href")).offset().top - 80 }, 1e3),
          o.preventDefault();
      });
    }),
    e(".about-active").slick({
      dots: !0,
      arrows: !1,
      infinite: !0,
      autoplay: !1,
      speed: 1e3,
      centerMode: !0,
      centerPadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: !1,
            arrows: !1,
          },
        },
      ],
    }),
    e(".testimonial-active").slick({
      dots: !1,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
      infinite: !0,
      autoplay: !1,
      speed: 1e3,
      centerMode: !0,
      centerPadding: "0px",
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: !1,
            arrows: !1,
            fade: !0,
          },
        },
      ],
    }),
    e(".control-active").slick({
      dots: !1,
      infinite: !0,
      speed: 1e3,
      autoplay: !0,
      arrows: !1,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 3, slidesToScroll: 1, infinite: !0 },
        },
        { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        {
          breakpoint: 767,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 575,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
      ],
    }),
    e(".brand-active").slick({
      dots: !1,
      infinite: !0,
      speed: 1e3,
      arrows: !1,
      slidesToShow: 5,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 4, slidesToScroll: 1, infinite: !0 },
        },
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        {
          breakpoint: 767,
          settings: { slidesToShow: 2, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 575,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
      ],
    }),
    e(".s-testi-active").slick({
      dots: !1,
      infinite: !0,
      speed: 1e3,
      arrows: !0,
      prevArrow:
        '<button type="button" class="slick-prev"><i class="fas fa-arrow-up"></i></button>',
      nextArrow:
        '<button type="button" class="slick-next"><i class="fas fa-arrow-down"></i></button>',
      vertical: !0,
      autoplay: !0,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1200,
          settings: { slidesToShow: 1, slidesToScroll: 1, infinite: !0 },
        },
        {
          breakpoint: 992,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 767,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
        {
          breakpoint: 575,
          settings: { slidesToShow: 1, slidesToScroll: 1, arrows: !1 },
        },
      ],
    }),
    e(".single-pricing").on("mouseenter", function () {
      e(this)
        .addClass("active")
        .parent()
        .siblings()
        .find(".single-pricing")
        .removeClass("active");
    }),
    e(".paroller").length && e(".paroller").paroller(),
    e(".selected").niceSelect(),
    e(".popup-image").magnificPopup({
      type: "image",
      gallery: { enabled: !0 },
      zoom: {
        enabled: !0,
        duration: 300,
        easing: "ease-in-out",
        opener: function (e) {
          return e.is("img") ? e : e.find("img");
        },
      },
    }),
    e(".popup-video").magnificPopup({ type: "iframe" }),
    e(".gallery-active,.blog-active").imagesLoaded(function () {
      var o = e(".gallery-active,.blog-active").isotope({
        itemSelector: ".grid-item",
        percentPosition: !0,
        masonry: { columnWidth: 1 },
      });
      e(".portfolio-menu").on("click", "button", function () {
        var i = e(this).attr("data-filter");
        o.isotope({ filter: i });
      });
    }),
    e(".portfolio-menu button").on("click", function (o) {
      e(this).siblings(".active").removeClass("active"),
        e(this).addClass("active"),
        o.preventDefault();
    }),
    AOS.init({ duration: 1e3, mirror: !0 }),
    e(".youtube-bg").YTPlayer({
      containment: ".youtube-bg",
      autoPlay: !0,
      loop: !0,
      mute: !0,
      opacity: 100,
      addRaster: !0,
      showControls: !1,
    }),
    e.scrollUp({
      scrollName: "scrollUp",
      topDistance: "300",
      topSpeed: 500,
      animation: "fade",
      animationInSpeed: 200,
      animationOutSpeed: 200,
      scrollText: '<i class="fas fa-level-up-alt"></i>',
      activeOverlay: !1,
    });
})(jQuery);
