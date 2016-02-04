PostSubs = new SubsManager();

Posts = new Mongo.Collection("posts");

Posts.before.insert(function (userId, doc) {
  var now = Date.now();
  var val = parseInt(moment(now).utc().format("YYYYMMDD"));

  doc.shortCode   = Kodepot.shortCode(doc._id, val);
  doc.shortName   = s.slugify(doc.title);
  doc.description = s(doc.contentHtml).stripTags().prune(155).value();
  doc.createdAt   = doc.updatedAt = now;
});

Posts.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.description = s(doc.contentHtml).stripTags().prune(155).value();
  modifier.$set.updatedAt = Date.now();
});
