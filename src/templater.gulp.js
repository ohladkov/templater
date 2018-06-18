'use strict';

const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const through = require('through2');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const Templater = require('./templater.js');


function templater(opts, container) {
  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new PluginError('gulp-example-plugin', 'Streaming not supported'));
      return;
    }

    try {
      const data = file.contents.toString();
      const dom = new JSDOM(data);
      const documentFile = dom.window.document;

      const replaceCustomTags = new Templater(opts, documentFile);

      file.contents = new Buffer(documentFile.documentElement.outerHTML);

      this.push(file);
    } catch (err) {
      this.emit('error', new PluginError('gulp-example-plugin', err));
    }

    cb();
  });
}

module.exports = templater;