$(document).ready(function(){

  productColorSwatch();

  if($(window).width() > 767) {
    productGalleryPopup();
  }
  mobImageZoom();

  $(document).on('change', '.swatch-element input', function(){
    var container = $(this).closest('#product-variants');
    var price = $(container).find('#product-selectors option:selected').data('price');
    var compare = $(container).find('#product-selectors option:selected').data('compare');
    var containers = $(this).closest('.product-shop');
    $(containers).find('.fair-wrapper .fair-price').text(price + ' AMANDA PEARL');
    $(containers).find('.fair-wrapper .fair-total').text(compare + ' TRADITIONAL RETAIL');
  });

})

function productColorSwatch() {
  var $imgs = $('.product-img-box .product__images');
  var contentHtml = $imgs.html();
  if($(window).width() <= 768) {
    $imgs.find('img[data--hidden]').remove();
    productInitImgSlide($imgs);
  }

  $(document).on('click', '[data-color-swatch]', function() {
    var handle = $(this).attr('data-handle');
    if($(window).width() > 768) {
      var $imgs = $('.product-img-box .product__images');
      productActiveImg($imgs, handle);
      productActiveImg($(".product-gallery-popup"), handle);
    }
    else {
      var $imgs = $('.product-img-box .product__images');
      $imgs.removeClass('slick-initialized').removeClass('slick-slider');
      $imgs.html(contentHtml);
      productActiveImg($imgs, handle);
      $imgs.find('img[data--hidden]').remove();
      productInitImgSlide($imgs);
    }
  })
}

function productActiveImg($imgs, handle) {
  $imgs.find('img').attr('data--hidden', true);
  $imgs.find('img[data-handle="' + handle + '"]').removeAttr('data--hidden');
  $imgs.find('img[data-handle="default"]').removeAttr('data--hidden');

  $(".product-gallery-popup [data-gallery-item]").removeClass("border-hidden")
  $(".product-gallery-popup img[data--hidden]").closest('[data-gallery-item]').addClass('border-hidden');

}

function productInitImgSlide($imgs) {
  $imgs.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    arrows: false
  })
}


function mobImageZoom() {
  var $popup = $('[data-mob-image-popup]');
  $(document).on('click', '.mobile-zoom', function(e) {
    e.preventDefault();
    var $target = $('.product-img-box .product__images .slick-slide.slick-current.slick-active img');
    var $img = $popup.find('img');
    $img.attr('src', $target.attr('src'));
    $popup.fadeIn(300);
  })

  $(document).on('click', '[data-mob-image-popup] button[data-popup-close]', function() {
    $popup.fadeOut(300);
  })
}


function productGalleryPopup() {

  var $popup = $(".product-gallery-popup");

  $(document).on('click', '[data-gallery-trigger]', function() {
    $popup.fadeIn(300);
    var idx = $(this).attr('data-idx');
    setTimeout(function() {
      galleryImgSlide(idx);
    }, 250);
  })

  $(document).on('click', '[data-gallery-thumbs] [data-gallery-item]', function() {
    var idx = $(this).attr('data-idx')
    galleryImgSlide(idx);
  })

  $(document).on('click', '.product-gallery-popup [data-popup-close]', function() {
    $popup.fadeOut();
  })
  $(".product-gallery-popup [data-gallery-item]").removeClass("border-hidden")
  $(".product-gallery-popup img[data--hidden]").closest('[data-gallery-item]').addClass('border-hidden');
}

function galleryPopupOpen() {

}


function galleryImgSlide(idx) {
  var $content = $('[data-gallery-imgs] .gallery-images-wrapper');
  var top = 0;

  for(var i = 0; i < idx; i ++) {
    var $item = $('[data-gallery-imgs] [data-gallery-item][data-idx="' + i + '"]');
    if($item.find('img[data--hidden]').length > 0) {
      // top += -15;
    }
    else {
      top += $item.height() + 15;
    }
  }
  
  $content.animate({
    scrollTop: top
  }, 800);

}
