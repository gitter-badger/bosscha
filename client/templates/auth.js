Template.auth.helpers({
    loginConfigured: function () {
      return Accounts.loginServicesConfigured();
    },

    username: function() {
      return Util.username();
    }
});

Template.auth.events({
  'click .button-github': function() {
    Meteor.loginWithGithub({}, function(error) {
      if (Meteor.user()) {
        Router.go("/");
      }
    });
  },

  'click .button-logout': function() {
    Meteor.logout(function(error) {
      Router.go("/");
    });
  }
});
