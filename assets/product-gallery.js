"use strict";

jQuery(function($) {
    "use strict";
    var INIT_SEL = "[data-theme-slick-init]";
    var OPTS_ATT = "data-theme-slick-options";
    var EVTS_ATT = "data-theme-slick-events";
    var DEFAULT_OPTS = {
        mobileFirst: true,
        slidesToShow: 1,
        infinite: false,
        dots: false,
        arrows: true,
        nextArrow: '<button class="slick-next next-arrow icon icon--next"><span class="visuallyhidden">Next slides</span></button>',
        prevArrow: '<button class="slick-prev prev-arrow icon icon--prev"><span class="visuallyhidden">Previous slides</span></button>',
        customPaging: function customPaging(slider, i) {
            return '<a class="dot"></a>';
        }
    };
    var OVERRIDE_OPTS = {
        carouselProduct: {
            slidesToShow: 1.4,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            infinite: false,
            responsive: [ {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 1e3,
                settings: {
                    slidesToShow: 5.4,
                    slidesToScroll: 5
                }
            } ]
        },
        carouselHomeSlide: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            infinite: true,
            speed: 500,
            autoplay:true,
            pauseOnHover: false
        },
        relatedProduct: {
            slidesToShow: 1.4,
            slidesToScroll: 1,
            dots: false,
            arrows: true,
            infinite: false,
            responsive: [ {
                breakpoint: 440,
                settings: {
                    slidesToShow: 2.4,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4.4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 1e3,
                settings: {
                    slidesToShow: 5.4,
                    slidesToScroll: 5
                }
            } ]
        },
        carouselBlog: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            appendDots: $(".blog--carousel__wrapper"),
            arrows: false
        },
        productGallery: {
            slidesToShow: 1.1,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            adaptiveHeight: false,
            responsive: [ {
                breakpoint: 768,
                settings: "unslick"
            } ]
        }
    };
    var $doc = $(document);
    $(INIT_SEL).each(function() {
        var $this = $(this);
        var customOpts = this.getAttribute(OPTS_ATT);
        var slideType = customOpts;
        var evts = this.getAttribute(EVTS_ATT);
        var opts = DEFAULT_OPTS;
        if (customOpts) {
            if (OVERRIDE_OPTS[customOpts]) {
                customOpts = OVERRIDE_OPTS[customOpts];
            } else {
                customOpts = JSON.parse(customOpts);
            }
            if (slideType == "carouselHomeSlide") {
                customOpts['speed'] = Number(this.getAttribute('slick-option-speed'));
                customOpts['pauseOnHover'] = this.getAttribute('slick-option-pauseonhover') == 'true';
            }
            opts = $.extend(true, {}, opts, customOpts);
        }
        if (evts) {
            $this.on(evts, function(e, slick) {
                $doc.trigger("slick-" + e.type, [ slick ]);
            });
        }
        $this.slick(opts);
    });

    $(window).resize('on', function () {
        console.log("resize");
    });
});