Meteor.methods({
  savePost: function(title, text) {
    var now = Date.now();

    Posts.insert({
      authorId: this.userId,
      title: title,
      text: text,
      text_html: marked(text)
    });
  },
  removePost: function(id) {
    Posts.remove({ _id: id, authorId: this.userId });
  }
});
