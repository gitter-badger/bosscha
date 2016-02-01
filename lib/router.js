// post: kodepot.com/+mDvh2NpwsswJhZfgc
// user: kodepot.com/subosito
// tag:  kodepot.com/$meteor

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render("mainLayout", { content: "notFound" });
  }
};

FlowRouter.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", { content: "home" });
  },
  triggersEnter: [function(context) {
    DocHead.setTitle("Kodepot: bicara <kode>, bicara Indonesia");
  }]
});

FlowRouter.route('/new', {
  name: 'post.new',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'postNew' });
  },
  triggersEnter: [function(context) {
    DocHead.setTitle("Postingan Baru - Kodepot");
  }]
});

FlowRouter.route('/+:_id', {
  name: 'post.show',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'post' });
  },
  triggersEnter: [function(context) {
    var _id = context.params._id

    // FIXME: Why this called 'user' subscribe?
    Meteor.subscribe("post", _id, {
      onReady: function() {
        var post = Posts.findOne({_id: _id }, { fields: { title: 1 } });
        DocHead.setTitle(post.title + " - Kodepot");
      }
    });
  }]
});

FlowRouter.route('/:username', {
  name: 'user.show',
  action: function() {
    BlazeLayout.render("mainLayout", { content: 'user' });
  },
  triggersEnter: [function(context) {
    var username = context.params.username;

    Meteor.subscribe("user", username, {
      onReady: function() {
        var user = Meteor.users.findOne({ 'profile.username': username }, { fields: { 'profile.name': 1, 'profile.username': 1 } });

        if (user !== undefined) {
          DocHead.setTitle(user.profile.name + ' (' + user.profile.username + ") - Kodepot");
        }
      }
    });
  }]
});
