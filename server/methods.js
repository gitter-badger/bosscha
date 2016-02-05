Meteor.methods({
  savePost: function(postId, title, content, tagString) {
    var tags = s(tagString).split(',');

    if (postId === null) {
      Posts.insert({
        authorId: this.userId,
        title: title, content: content, contentHtml: marked(content), tags: tags
      });
    } else {
      Posts.update(
        { _id: postId },
        { $set: { title: title, content: content, contentHtml: marked(content), tags: tags } }
      );
    }
  },

  removePost: function(id) {
    Posts.remove({ _id: id, authorId: this.userId });
  }
});
