Util = {
  username: function() {
    if (Meteor.user()) {
      return Meteor.user().services.github.username;
    } else {
      return "";
    }
  }
}
