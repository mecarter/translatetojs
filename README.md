translateTo.js
==============

A simple jQuery plugin for hardware-accelerated CSS transforms with graceful .animate() fallbacks

Usage:
------

  $(element).translateTo(x, y, duration);
  
Defaults (duration is always in ms):
------------------------------------

  x: 0,
  y: 0,
  duration: 300

Callback:
---------

  .on('animationEnd');

Move stuff around:
------------------

  $('#stage1 .box').on('click', function() {
    $(this).translateTo(421, 156, 2666);
  });

Do something when it's done animating:
--------------------------------------

  $('#stage2 .box')
    .on('click', function() {
      $(this).translateTo(-666, 202, 1420);
    })
    .on('animationEnd', function() {
      $(this).text('Thanks!');
    });

Some notes:
-----------
* Support for position: fixed elements is a little dodgy. Plays best with position: absolute or position: static elements.
* Go crazy!

### Tweet me @markecarter if you have any questions or suggestions!