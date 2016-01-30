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
