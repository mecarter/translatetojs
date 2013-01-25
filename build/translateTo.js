/*
 *	 Project: translateTo.js
 *	 Description: jQuery plugin for hardware-accelerated CSS translations with graceful .animate() fallbacks
 *	 Author: Mark E. Carter (github.com/mecarter)
 */

;(function ($, window, document, undefined) {

	var pluginName = 'translateTo';
	var defaults = {
		x:				0,
		y:				0,
		duration:	300
	};

	// The actual plugin constructor
	function TranslateTo(element, options) {
		this.element = element;
		this.options = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	TranslateTo.prototype = {
		init: function () {	
			// define $elem
			var $elem		= $(this.element),
				has3d		= this.has3d(),
				x			= this.options.x,
				y			= this.options.y,
				duration	= this.options.duration;
				
			console.log($elem, x, y, duration, has3d);
			
			// add og-coords data first time an element is translated
			if (!has3d && !$elem.data('og-coords')) {
			
				// make the element moveable
				$elem
					.css('position', 'absolute')
					.parent()
						.css('position', 'relative');
				
				var ogX	= $elem.position().left,
					ogY	= $elem.position().top;
				
				// add this info the $elem
				$elem.data('og-coords', { x: ogX,  y: ogY });
			}
				
			if (has3d) {
				// if 3d is possible move it using transform: translate3d
				$elem
					.css({
						'transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)',
						'-webkit-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)',
						'-moz-transform': 'translate3d(' + x + 'px, ' + y + 'px, 0)',
						'transition': 'all ' + duration + 'ms',
						'-webkit-transition': 'all ' + duration + 'ms',
						'-moz-transition': 'all ' + duration + 'ms'
					})
					.on('transitionend webkitTransitionEnd oTransitionEnd', function() {
						// apply a common trigger for hooks
						$elem.trigger('animationEnd');
					});
			} else {
				// otherwise move it using jquery animate, og-coords tell it where to return
				$elem
					.animate({
						'left': $elem.data('og-coords').x + x,
						'top':	$elem.data('og-coords').y + y
					}, duration, function() {
						// apply a common trigger for hooks
						$elem.trigger('animationEnd');
					});
			}
		},
		has3d: function () {
			// has3d check by Lorenzo Polidori (https://gist.github.com/3794226)
			// does this browser support 3d translation?
			var el = document.createElement('p'), 
				 check3d,
				 transforms = {
					 'WebkitTransform':'-webkit-transform',
					 'OTransform':'-o-transform',
					 'MSTransform':'-ms-transform',
					 'MozTransform':'-moz-transform',
					 'Transform':'transform'
				 };
		
			// Add it to the body to get the computed style.
			document.body.insertBefore(el, null);
		
			for (var t in transforms) {
				if (el.style[t] !== undefined) {
					el.style[t] = 'translate3d(1px,1px,1px)';
					check3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
				}
			}
		
			document.body.removeChild(el);
		
			return check3d !== undefined && check3d.length > 0 && check3d !== 'none';
		}
	};

	$.fn[pluginName] = function (x, y, duration) {
		var options = {
			x: x, 
			y: y, 
			duration: duration
		};
			
		return this.each(function () {
			new TranslateTo(this, options);
		});
	 };

})(jQuery, window, document);