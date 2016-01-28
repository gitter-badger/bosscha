Template.editor.events({
  'keyup #markdown-editor': function(event) {
    $('.markdown-preview').html(marked(event.target.value));
  },

  'submit .new-post': function(event) {
    event.preventDefault();

    var title = event.target.title.value;
    var text  = event.target.description.value;

    var callback = function(error, result) {
      event.target.title.value = '';
      event.target.description.value = '';
      $('.markdown-preview').html("");
    };

    Meteor.call('savePost', title, text, callback);
  }
});

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

