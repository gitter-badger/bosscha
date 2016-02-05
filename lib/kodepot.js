PostSubs = new SubsManager();

Posts = new Mongo.Collection("posts");

generateDescription = function(html) {
  return s(html).stripTags().prune(155).value();
}

Posts.before.insert(function (userId, doc) {
  var now = Date.now();
  var val = parseInt(moment(now).utc().format("YYYYMMDD"));

  doc.shortCode   = Kodepot.shortCode(doc._id, val);
  doc.shortName   = s.slugify(doc.title);
  doc.description = generateDescription(doc.contentHtml);
  doc.createdAt   = doc.updatedAt = now;
});

Posts.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.description = generateDescription(doc.contentHtml);
  modifier.$set.updatedAt = Date.now();
});
