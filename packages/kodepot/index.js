hljs = Npm.require("highlight.js");
Hashids = Npm.require("hashids");

Kodepot = {
  shortCode: function(salt, value) {
    if (salt === undefined) {
      salt = Meteor.uuid();
    }

    var code = new Hashids(salt, 6);

    return code.encode(value);
  }
}
