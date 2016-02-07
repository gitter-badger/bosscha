Meteor.methods({
  savePost: function(postId, title, content, tagString) {
    var tags = s(tagString).split(',');
    var contentHtml = marked(content, {sanitize: true});

    if (postId === null) {
      Posts.insert({
        authorId: this.userId,
        title: title, content: content, contentHtml: contentHtml, tags: tags
      });
    } else {
      Posts.update(
        {_id: postId},
        {$set: {title: title, content: content, contentHtml: contentHtml, tags: tags}}
      );
    }
  },

  removePost: function(id) {
    Posts.remove({_id: id, authorId: this.userId});
  }
});
