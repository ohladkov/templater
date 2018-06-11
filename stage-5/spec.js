describe("Stage 5", function() {
  it("must create method `templater` for `jQuery.fn`", function() {
      (typeof jQuery.fn.templater).should.equals('function');
  });

  it("must replace element with tag `panel` to element with tag 'div', class 'panel'", function() {
      $('panel').length.should.equals(2);
      $(document).templater({
        tags: {
          'panel': '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
        }
      });

      var replaced = $('.panel');
      replaced.length.should.equals(2, 'Element with `div.panel` tag was not created. Amount of `div.panel` elements in DOM');
      replaced.attr('class').should.equals('panel', 'Element with `button` tag has wrong class. It has class');
  });
});