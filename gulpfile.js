const gulp = require('gulp');
const rename = require('gulp-rename');
const templater = require('./src/templater.gulp.js');

gulp.task('build', () => {
  gulp.src('src/demo/source.html')
    .pipe(templater({
      tags: {
        customlink: '<a href="#">{{text}}</a>',
        customelement: '<div class="custom-element">{{text}}<br><customlink text="Custom Inner Link"></customlink></div>',
        panel: '<div class="panel"><div class="panel-heading">{{heading}}</div><div class="panel-body">{{html}}</div></div>'
      }
    }))
    .pipe(rename('dist.html'))
    .pipe(gulp.dest('src/demo/'))
});