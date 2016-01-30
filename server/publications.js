/**
 * Note: 'services.github.username' is required by avatar package.
 **/

Meteor.publish(null, function() {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, { fields: {
            "services.github.username": 1,
            "profile.username": 1,
            "profile.email": 1,
            "profile.name": 1
        } });
    } else {
        this.ready();
    }
});

Meteor.publish('post', function(id) {
  return Posts.find({ _id: id }, { fields: { text: 0 }});
})

Meteor.publish('recentPosts', function() {
  return Posts.find({}, { fields: { text: 0, text_html: 0 }, sort: { createdAt: -1 }});
});

Meteor.publish('userPosts', function(username) {
  var user = Meteor.users.findOne({ 'profile.username': username }, { _id: 1 });

  if (user === undefined) {
    return this.ready();
  } else {
    return Posts.find({ authorId: user._id }, { fields: { text: 0, text_html: 0 }});
  }
});

Meteor.publish('user', function(username) {
  return Meteor.users.find(
      { 'profile.username': username },
      { fields: {
        "profile.name": 1,
        "profile.username": 1,
        "services.github.username": 1
      }}
  );
});
