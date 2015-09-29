(function ($) {
    'use strict';

    $.fn.scrollPoint = function (params) {
        var $window = $(window);

        params = $.extend({
            up         : false,
            down       : false,
            offsetUp   : 0,
            offsetDown : 0
        }, params);

        return this.each(function () {
            var up         = params.up,
                down       = params.down,
                relativePos  = {
                    isUp   : true,
                    isDown : false,
                    isIn   : false
                },
                element    = $(this);

            if (!up && up !== 0) {
                up = element.offset().top;
            }

            if (!down && down !== 0) {
                down = up + element.outerHeight();
            }

            up   -= params.offsetUp;
            down -= params.offsetDown;

            function triggerEvent(eventType, eventParams) {
                var n, Event = $.Event(eventType);

                for(n in eventParams) {
                    Event[n] = eventParams[n];
                }

                element.trigger(Event);
            }

            function checkScroll() {
                var pos   = $window.scrollTop(),
                    oldRelativePos = $.extend({}, relativePos);
                
                relativePos.isUp   = pos <= up;
                relativePos.isDown = pos >= down;
                relativePos.isIn   = !relativePos.isUp && !relativePos.isDown;
                
                if (oldRelativePos.isIn !== relativePos.isIn || oldRelativePos.isUp !== relativePos.isUp) {
                    // If the scroll jumped directly between isUp and isDown
                    if (oldRelativePos.isIn === relativePos.isIn) {
                        triggerEvent("scrollPointEnter", relativePos);
                    }
                    triggerEvent("scrollPoint" + (relativePos.isIn ? "Enter" : "Leave"), relativePos);
                }

                triggerEvent("scrollPointMove", relativePos);
            }

            $window.scroll(checkScroll);
        });
    };
})(jQuery);
