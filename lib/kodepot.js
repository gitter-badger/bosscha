PostSubs = new SubsManager();

Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  var now = Date.now();
  var val = parseInt(moment(now).utc().format("YYYYMMDD"));

  doc.shortCode = Kodepot.shortCode(doc._id, val);
  doc.shortName = getSlug(doc.title);
  doc.createdAt = doc.updatedAt = now;
});
