ROLES = { user: "user" }

Meteor.startup(function() {
  marked.setOptions({
    langPrefix: "hljs ",
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  Avatar.setOptions({ generateCSS: false });
});

Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  doc.createdAt = doc.updatedAt = Date.now();
});
