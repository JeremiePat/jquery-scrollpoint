/**
 * The scrollPoint plugin allow to define scrolling zones to interact with them
 *
 * The plugin defines 3 custom events :
 *  - scrollPointEnter
 *  - scrollPointLeave
 *  - scrollPointMove
 */
(function($){
	$.fn.scrollPoint = function( params ) {
		params = $.extend({
			up: 0, 
			down: 0
		}, params);
		
		return this.each(function() {
			var element = $(this),
				$window = $(window),
				isIn = false;
			    hasStarted = false;
	
			$window.scroll(function() {
				var Event = $.Event("scrollPointMove"), 
					pos = $window.scrollTop(),
				    oldIn = isIn;
				
				isIn = pos >= params.up && pos <= params.down;
				
				if(oldIn !== isIn) {
					if(!hasStarted && isIn) {
						hasStarted = true;
						element.trigger("scrollPointEnter");
					}
				
					if (hasStarted && !isIn) {
						hasStarted = false;
						element.trigger("scrollPointLeave");
					}
				}
				
				Event.isIn = isIn;
				element.trigger(Event);
			});
		});		  
	};
})(jQuery);