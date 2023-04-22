'use strict';

var minify = require('html-minifier').minify;
var minify = _.memoize(function() {
    var minify = require('html-minifier').minify;
    return function(value, options, callback, errorback) {
      options.log = function(message) {
        console.log(message);
      };
      var minified;
      try {
        minified = minify(value, options);
      }
      catch (err) {
        return errorback(err);
      }
      if (typeof callback === "function") {
        callback(minified);
      }
    };
  })();
var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: "javascript",
    mode: "css",
    theme: "esstx",
    lineNumbers: true
});

$('.CodeMirror').attr('id', 'code_mirror');

var options = {
    collapseWhitespace: true,
    removeComments: true
};

function enableLineWrapping() {
    editor.setOption('lineWrapping', !editor.getOption('lineWrapping'));
}

function mincode() {
    var html = editor.getValue();
    minify(html, options, function(minifiedHtml) {
        editor.setValue(minifiedHtml);
    }, function(err) {
        console.error(err);
    });
}

function copycode() {
  const tmpElem = document.createElement('div');
  const clipboardText = document.createTextNode(editor.getValue());
  tmpElem.appendChild(clipboardText);
  document.body.insertAdjacentElement('beforeend', tmpElem);
  const range = document.createRange();
  range.selectNode(tmpElem);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand('copy');
  document.body.removeChild(tmpElem);
}

_.defer(function() {
    $('#code').attr('id', 'code_mirror');
});

$(document).ready(function() {
    $('#enable_line_wrapping_button').click(enableLineWrapping);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})