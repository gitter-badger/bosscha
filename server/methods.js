Meteor.methods({
  savePost: function(postId, title, content) {
    if (postId === null) {
      Posts.insert({
        authorId: this.userId,
        title: title, content: content, contentHtml: marked(content)
      });
    } else {
      Posts.update(
        { _id: postId },
        { $set: { title: title, content: content, contentHtml: marked(content) } }
      );
    }
  },

  removePost: function(id) {
    Posts.remove({ _id: id, authorId: this.userId });
  }
});
