Template.user.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    var username = FlowRouter.getParam('username');
    var handle = PostSubs.subscribe('userPosts', username);
    self.subscribe('user', username);
    self.ready.set(handle.ready());
  });
});

Template.user.onRendered(function() {
  if (this.subscriptionsReady) {
    var user = Meteor.users.findOne({ 'profile.username': FlowRouter.getParam('username') }, { fields: { 'profile.name': 1, 'profile.username': 1 } });
    DocHead.setTitle(user.profile.name + ' (' + user.profile.username + ") - Kodepot");
  }
});

Template.user.helpers({
  isReady: function() {
    return Template.instance().ready.get();
  },

  user: function() {
    return Meteor.users.findOne({ 'profile.username': FlowRouter.getParam('username') });
  },

  posts: function() {
    var user = Meteor.users.findOne({ 'profile.username': FlowRouter.getParam('username') });
    return Posts.find({ authorId: user._id });
  }
});

