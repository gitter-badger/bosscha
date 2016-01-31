hljs = Npm.require("highlight.js");
huid = function(key) {
  if (key === undefined) {
    key = Meteor.uuid();
  }

  var Hashids = Npm.require('hashids');
  var uuid = new Hashids(key, 6);

  return uuid.encode(1001);
}
