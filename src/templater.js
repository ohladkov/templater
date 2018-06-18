class Templater {

  constructor(obj, container) {
    this.tags = obj.tags;
    this.container = container;

    return this.run(this.tags, this.container);
  }

  run(obj) {
    for (const key in obj) {
      const domTags = this.container.querySelectorAll(key);

      if (domTags.length < 1) {
        return;
      }

      const matches = this.findMatches(obj[key]);

      domTags.forEach((tag) => {
        this.render(tag, obj[key], matches);
      });
    }

    return this.run(obj);
  }

  render(tag, template, matches) {
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

  findMatches(str) {
    const substrToFind = /{{(.+?)}}/gm;
    const matchArr = [];
    const match = {};
    let curMatch;

    while (curMatch = substrToFind.exec(str)) {
      match[curMatch[0]] = curMatch[1];

      matchArr.push(match);
    }

    return matchArr;
  }
}

module.exports = Templater;