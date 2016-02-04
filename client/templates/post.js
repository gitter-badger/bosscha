Template.editor.events({
  'submit .new-post': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var content = event.target.content.value;

    var callback = function(error, result) {
      event.target.title.value = '';
      event.target.content.value = '';

      $('#post-preview').html("");

      editor = $('#markdown-editor').next('.CodeMirror')[0].CodeMirror;
      editor.setValue('');
      editor.clearHistory();
    };

    Meteor.call('savePost', title, content, callback);
  }
});

Template.editor.rendered = function() {
  var editor = CodeMirror.fromTextArea(this.find('#markdown-editor'), {
    autofocus: true,
    lineNumbers: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    mode: "gfm",
    theme: "elegant"
  });

  editor.on("change", function(object) {
    $('#post-preview').html(marked(object.getValue()));
  });
}

Template.postList.helpers({
  isRemovable: function() {
    return this.authorId == Meteor.userId();
  }
});

Template.postRemove.events({
  'click .remove-post': function() {
    var postId = this._id;

    swal({
      title: "Are you sure?",
      text: "You will not be able to recover post!",
      type: "warning",
      showCancelButton: true,
      closeOnConfirm: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!"
    }, function(){
      Meteor.call('removePost', postId);
    });
  }
});

Template.post.helpers({
});
