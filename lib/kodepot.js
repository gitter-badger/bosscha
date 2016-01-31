Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  doc.shortCode = huid(doc._id);
  doc.createdAt = doc.updatedAt = Date.now();
});

if (Meteor.isClient) {
  PostSubs = new SubsManager();
}
