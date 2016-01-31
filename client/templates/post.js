Template.editor.events({
  'submit .new-post': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var content = event.target.content.value;

    var callback = function(error, result) {
      event.target.title.value = '';
      event.target.content.value = '';

      $('#markdown-preview').html("");

      editor = $('#markdown-editor').next('.CodeMirror')[0].CodeMirror;
      editor.setValue('');
      editor.clearHistory();
    };

    Meteor.call('savePost', title, content, callback);
  }
});

Template.editor.rendered = function() {
  var editor = CodeMirror.fromTextArea(this.find('#markdown-editor'), {
    lineNumbers: true,
    autofocus: true,
    mode: "gfm",
    theme: "paraiso-dark"
  });

  editor.on("change", function(object) {
    $('#markdown-preview').html(marked(object.getValue()));
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

