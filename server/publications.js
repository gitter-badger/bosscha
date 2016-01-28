Meteor.publish(null, function() {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, { fields: {
            "services.github.id": 1,
            "services.github.username": 1,
            "services.github.email": 1
        } });
    } else {
        this.ready();
    }
});

Meteor.publish('post', function(id) {
  return Posts.find({ _id: id });
})

Meteor.publish('recentPosts', function() {
  return Posts.find({}, { sort: { createdAt: -1 } });
});

Meteor.publish('userPosts', function(username) {
  var user = Meteor.users.findOne({ 'services.github.username': username }, { _id: 1});
  return Posts.find({ authorId: user._id });
});

Meteor.publish('user', function(username) {
  return Meteor.users.find({ 'services.github.username': username});
});
