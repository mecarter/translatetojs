$(function() {
  // SLIDESHOW example
  function slideshowInit() {
    var $slideshow = $('.slideshow'),
      $current = $('.slide.current').length ? $('.slide:first').addClass('current') : $('.slide.current'),
      width = $slideshow.outerWidth(),
      height = $current.outerHeight();
    
    if ($('.slide').length > 1 && !$slideshow.hasClass('initiated')) {
      $('.next').show();
    }
    
    $current
      .translateTo(0, 0, 10)
      .prevAll('.slide')
        .translateTo(-width, 0, 10)
        .end()
      .nextAll('.slide')
        .translateTo(width, 0, 10);
    
    $slideshow
      .css('height', height)
      .addClass('initiated');
  }
  
  function slideshowNav() {
    var isPrev    = $(this).hasClass('prev'),
      $current  = $('.slide.current'),
      $newCurrent  = isPrev ? $current.prev('.slide') : $current.next('.slide'),
      width = $('.slideshow').outerWidth();
      
    $current
      .translateTo(isPrev ? width : -width, 0, 300)
      .removeClass('current');
      
    $newCurrent
      .translateTo(0, 0, 300)
      .addClass('current');
    
    if (isPrev) {
      $('.next').fadeIn(100);
      if (!$newCurrent.prev('.slide').length) $('.prev').fadeOut(100);
    } else {
      $('.prev').fadeIn(100);
      if (!$newCurrent.next('.slide').length) $('.next').fadeOut(100);
    }
    
    return false;
  }
  
  $(window)
    .load(slideshowInit)
    .resize(slideshowInit);
  
  $('.slide-nav').click(slideshowNav);
});