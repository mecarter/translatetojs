$(function() {
  // STAGE1 example
  $('#stage1 .box')
    .on('click', function() {
      $(this).translateTo(421, 156, 2666);
    });
  
  // STAGE2 example
  $('#stage2 .box')
    .on('click', function() {
      $(this).translateTo(-666, 202, 1420);
    })
    .on('animationEnd', function() {
      $(this).text('Thanks!');
    });
});