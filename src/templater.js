(function ($) {

  function run(obj, container) {
    for (const key in obj) {
      const domTags = [...container.querySelectorAll(key)];

      if (domTags.length < 1) {
        return;
      }

      const matches = findMatches(obj[key]);

      domTags.forEach((tag) => {
        render(tag, obj[key], matches);
      });
    }

    return run(obj, container);
  }

  function render(tag, template, matches) {
    matches.forEach((match) => {
      for (const key in match) {
        if (match[key] === 'html') {
          template = template.replace(key, tag.innerHTML);
        }
        template = template.replace(key, tag.getAttribute(match[key]));
      }

      return template;
    });

    tag.outerHTML = template;
  }

  function findMatches(str) {
    const substrToFind = /{{(.+?)}}/gm;
    const matchArr = [];
    let match = {};
    let curMatch;

    while (curMatch = substrToFind.exec(str)) {
      match[curMatch[0]] = curMatch[1];

      matchArr.push(match);
    }

    return matchArr;
  }


  $.fn.templater = function (options) {
    const tagsContainer = this[0];
    const opts = $.extend({}, $.fn.templater.defaults, options);
    const tags = {};

    for (const key in opts.tags) {
      tags[key] = opts.tags[key];
    }

    this.each(function () {
      run(tags, tagsContainer);
    });

    return this;
  };

})(jQuery);