ReactiveForms.createFormBlock({
  template: 'postFormBlock',
  submitType: 'normal'
});

ReactiveForms.createElement({
  template: "titleInput",
  validationEvent: 'keyup',
  reset: function(element) {
    $(element).val("");
  }
});

ReactiveForms.createElement({
  template: "tagInput",
  validationEvent: 'keyup',
  reset: function(element) {
    $(element).val("");
  }
});

ReactiveForms.createElement({
  template: "markdownInput",
  reset: function(element) {
    textarea = this.$(".markdown-editor");
    codemirror = textarea.next('.CodeMirror')[0].CodeMirror;
    codemirror.setValue('');
    codemirror.clearHistory();

    preview = this.$(".markdown-preview");
    preview.html('');
  },
  rendered: function() {
    var preview = this.$('.markdown-preview');
    var editor = CodeMirror.fromTextArea(this.find('.markdown-editor'), {
      autofocus: true,
      lineNumbers: true,
      lineWrapping: true,
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      mode: "gfm",
      theme: "elegant"
    });

    var valueHtml = marked(editor.getValue());
    var valueHtml = sanitizeHtml(valueHtml);

    preview.html(valueHtml);

    editor.on("change", function(object) {
      var valueHtml = marked(object.getValue());
      var valueHtml = sanitizeHtml(valueHtml);

      preview.html(valueHtml);
    });
  }
});
