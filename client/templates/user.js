Template.user.helpers({
  isReady: function() {
    return FlowRouter.subsReady();
  },

  user: function() {
    return Meteor.users.findOne({ 'profile.username': FlowRouter.getParam('username') });
  },

  posts: function() {
    var user = Meteor.users.findOne({ 'profile.username': FlowRouter.getParam('username') });
    return Posts.find({ authorId: user._id });
  }
});

