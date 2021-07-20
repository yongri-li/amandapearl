$(document).ready(function(){

  if($(window).width() > 767) {
    productGalleryPopup();
  }
  mobImageZoom();
})


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
}

function galleryPopupOpen() {

}


function galleryImgSlide(idx) {
  var $content = $('[data-gallery-imgs] .gallery-images-wrapper');
  var $target = $('[data-gallery-imgs] [data-gallery-item][data-idx=' + idx + ']');
  var top = 0;
  for(var i = 0; i < idx; i ++) {
    var $item = $('[data-gallery-imgs] [data-gallery-item][data-idx=' + idx + ']');
    top += $item.height() + 15;
  }

  console.log(idx + "::::" + top);
  $content.animate({
    scrollTop: top
  }, 800);

}
