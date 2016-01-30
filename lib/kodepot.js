PostSubs = new SubsManager();

Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  doc.createdAt = doc.updatedAt = Date.now();
});
