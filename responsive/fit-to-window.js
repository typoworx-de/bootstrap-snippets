/**
 * This prototype is not finished yet!!!
 */

(function($) {
  $.fn.imageCovering = function(options) {
    this.options = options;
    this.container = $(this).is('img') ? $(this).parent() : $(this);
    this.image = $('img:first-child', this.container);
    this.imageProperties = {
		loaded: false,
		scaleOrientation: (options && options.hasOwnProperty('orientation')) ? options['orientation'] : 'horizontal',
		width: null, height: null,
		aspectRatio: null,
		natural: { width: null, height: null }
	};

    $(this.image).on('load resize initializeImageCovering', function(e)
	{
        self.imageProperties.loaded = true;
		self.imageProperties.width = $(self.image).width();
        self.imageProperties.height = $(self.image).height();
        self.imageProperties.natural.width = $(self.image).get(0).naturalWidth;
        self.imageProperties.natural.height = $(self.image).get(0).naturalHeight;

        self.imageProperties.aspectRatio = self.imageProperties.natural.width > self.imageProperties.natural.height
            ? self.imageProperties.natural.width / self.imageProperties.natural.height
            : self.imageProperties.natural.height / self.imageProperties.natural.width
		;
    });

	$(window).on('load resize resizeImageCovering', function(e)
	{
		if(!self.imageProperties.loaded) return;
		var rescaleWidth, rescaleHeight, scaleFactor;

console.log(self.imageProperties.scaleOrientation);
		if(self.imageProperties.scaleOrientation === 'horizontal')
        {
            $(self.image)
                .width($(window).width())
                .height(self.imageProperties.natural.height / (self.imageProperties.aspectRatio))
            ;
        }
		else
        {
            $(self.image)
                .width(self.imageProperties.natural.width / (self.imageProperties.aspectRatio))
                .height($(window).height())
            ;
        }
    });

	this.init = function()
	{
        if($(self.image).get(0).complete)
        {
            $(self.image).trigger('initializeImageCovering');
        }
    }

	var self = this;
	self.init();
  };
})(jQuery);

$('.carousel', '#area-feature').imageCovering();
