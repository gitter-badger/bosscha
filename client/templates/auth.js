Template.auth.helpers({
  username: function() {
    return Meteor.user().profile.username;
  }
});

Template.auth.events({
  'click .button-github': function() {
    Meteor.loginWithGithub({}, function(error) {
      if (Meteor.user()) {
        Router.redirect("/");
      }
    });
  },

  'click .button-logout': function() {
    Meteor.logout(function(error) {
      Router.redirect("/");
    });
  }
});

Template.auth.onRendered(function() {
  var menu = new Foundation.DropdownMenu(this.$(".dropdown.menu"), {
  });
});
