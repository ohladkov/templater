(function ($) {

  $.fn.templater = function (options) {
    const opts = $.extend({}, $.fn.templater.defaults, options);

    this.each(function () {
      return new Templater(opts);
    });

    return this;
  };

})(jQuery);