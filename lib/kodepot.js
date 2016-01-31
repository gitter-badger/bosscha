Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  doc.createdAt = doc.updatedAt = Date.now();
});

if (Meteor.isClient) {
  PostSubs = new SubsManager();
}
