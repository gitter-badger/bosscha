Template.user.helpers({
  'posts': function() {
    return Posts.find({ authorId: this._id });
  }
});
