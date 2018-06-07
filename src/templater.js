const Templater = {
  run() {
    const tags = Array.from(document.querySelectorAll('bootstrap_button'));
    const transformedTagHtml = '<button class="btn btn-default" type="submit">Some Text</button>'
    tags.forEach((el) => {
      el.outerHTML = transformedTagHtml;
    })
  }
}