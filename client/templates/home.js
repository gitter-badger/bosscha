Template.home.onCreated(function() {
  var self = this;
  self.ready = new ReactiveVar();
  self.autorun(function() {
    var handle = PostSubs.subscribe('recentPosts');
    self.ready.set(handle.ready());
  });
});

Template.home.helpers({
  isReady: function() {
    return Template.instance().ready.get();
  },
  posts: function() {
    return Posts.find({}, { sort: { createdAt: -1 } });
  }
});
