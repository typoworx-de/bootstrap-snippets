(function($) {
   $(document).ready(function() {

      /**
       * Simple slide effect for BS-Slider
       * using custom effect.in/.out callback
       */
      (function(slider, slideSpeed) {
         var effects = {};

         effects.out = function(el, speed, callbackFn) {
            $(el).css({
               bottom: '-100%',
               opacity: 0
              }, speed);

            if(callbackFn instanceof Function) $.proxy(callbackFn, el)();
          };
         effects.in = function(el, speed, callbackFn) {
            $(el).animate({
                 bottom: '0',
                 opacity: 1
              }, {
               duration: speed,
               complete: callbackFn
              })
          };

         effects.out(
            $('.ce-bodytext', slider),
            slideSpeed,
            function() {
               effects.in(this, slideSpeed);
              }
         );
         $(slider).on('slide.bs.carousel slid.bs.carousel', function (e) {
            if(e.type === 'slid') {
              effects.in($('.ce-bodytext', this), slideSpeed);
            } else {
              effects.out($('.ce-bodytext', this), slideSpeed);
            }
          })
      })($('#slider-26'), 'slow');

  });
})(jQuery);
