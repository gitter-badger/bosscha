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
  postTags: function() {
    return s.toSentence(this.tags);
  }
});
