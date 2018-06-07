const Templater = {
  tags: [],
  templates: [],

  addTag(tag, template) {
    this.tags.push(tag);
    this.templates.push(template);
  },

  render(tags,templates) {
    tags.forEach((tag, i) => {
      const domTags = [...document.querySelectorAll(tag)];
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
      });
    });

    function findMatches(str) {
      const re = /({{.+?}})/gm;
      const matchArr = [];
      let curMatch;
      while(curMatch = re.exec(str)) {
        matchArr.push(curMatch[1]);
      }
      return matchArr;
    }
  },

  run() {
    this.render(this.tags, this.templates);
  }
}