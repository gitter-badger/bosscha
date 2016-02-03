Template.auth.helpers({
  username: function() {
    return Meteor.user().profile.username;
  }
});

Template.auth.events({
  'click .button-github': function() {
    Meteor.loginWithGithub({}, function(error) {
      if (Meteor.user()) {
        PostSubs.clear();
        Router.go("/");
      }
    });
  },

  'click .button-logout': function() {
    Meteor.logout(function(error) {
      PostSubs.clear();
      Router.go("/");
    });
  }
});

Template.auth.onRendered(function() {
  var menu = new Foundation.DropdownMenu(this.$(".dropdown.menu"), {
  });
});
