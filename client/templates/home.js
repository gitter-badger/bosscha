Template.home.helpers({
  isReady: function() {
    return FlowRouter.subsReady();
  },
  posts: function() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  }
});
