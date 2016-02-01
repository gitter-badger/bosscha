PostSubs = new SubsManager();

Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  doc.shortCode = huid(doc._id);
  doc.shortName = getSlug(doc.title);
  doc.createdAt = doc.updatedAt = Date.now();
});
