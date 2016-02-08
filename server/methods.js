Meteor.methods({
  savePost: function(postId, title, content, tagString) {
    var tags = s(tagString).split(',');
    var cleanHtml = sanitizeHtml( marked(content), sanitizeOpts);

    if (postId === null) {
      Posts.insert({
        authorId: this.userId,
        title: title, content: content, contentHtml: cleanHtml, tags: tags
      });
    } else {
      Posts.update(
        {_id: postId},
        {$set: {title: title, content: content, contentHtml: cleanHtml, tags: tags}}
      );
    }
  },

  removePost: function(id) {
    Posts.remove({_id: id, authorId: this.userId});
  }
});
