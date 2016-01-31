Meteor.methods({
  savePost: function(title, content) {
    var now = Date.now();

    Posts.insert({
      authorId: this.userId,
      title: title,
      content: content,
      contentHtml: marked(content)
    });
  },

  removePost: function(id) {
    Posts.remove({ _id: id, authorId: this.userId });
  }
});
