(function($) {

  $.fn.templater = function(options) {

    const self = this;
    const tagsContainer = self[0];
    const opts = $.extend( {}, $.fn.templater.defaults, options );
    const tags = [];
    const templates = [];


    for (const key in opts.tags) {
      if (opts.tags.hasOwnProperty(key)) {
        tags.push(key);
        templates.push(opts.tags[key]);
      }
    }


    function render() {
      tags.forEach((tag, i) => {
        const domTags = [...tagsContainer.querySelectorAll(tag)];
        let length = domTags.length;

        if ( !length ) {
          return;
        }

        let template = templates[i];
        const matches = findMatches(template);

        domTags.forEach((tag) => {
          matches.forEach((match) => {
            const attr = match.slice(2, match.length-2);
            if ( attr === 'html' ) {
              template = template.replace(match, tag.innerHTML);
            }
            template = template.replace(match, tag.getAttribute(attr));
            return template;
          });

          tag.outerHTML = template;
          length--;
        });

        return render();
      });
    }

    function findMatches(str) {
      const re = /({{.+?}})/gm;
      const matchArr = [];
      let curMatch;

      while(curMatch = re.exec(str)) {
        matchArr.push(curMatch[1]);
      }

      return matchArr;
    }

    this.each(function() {
      render();
    });

    return this;
  };

})(jQuery);