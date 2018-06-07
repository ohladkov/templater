const Templater = {
  tags: [],
  templates: [],
  addTag(tag, template) {
    this.tags.push(tag);
    this.templates.push(template);
  },
  run() {
    this.tags.forEach((tag, i) => {
      const domTag = [...document.querySelectorAll(tag)];
      const template = this.templates[i];

      domTag.forEach((el) => {
        el.outerHTML = template;
      })
    })
  }
}